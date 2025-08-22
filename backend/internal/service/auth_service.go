package service

import (
	"errors"
	"fmt"
	"lms/internal/handler/dto/request"
	"lms/internal/model"
	repositoryInterfaces "lms/internal/repository/interfaces"
	serviceInterfaces "lms/internal/service/interfaces"
	"lms/internal/util"
	"time"
)

type AuthService struct {
	userRepo  repositoryInterfaces.UserRepositoryInterface
	auditRepo repositoryInterfaces.AuditRepositoryInterface
}

// LoginValidationResult 로그인 검증 결과
type LoginValidationResult struct {
	IsValid  bool
	FailCode string
	ErrorMsg string
	User     *model.UserAccount
}

func InitAuthService(userRepo repositoryInterfaces.UserRepositoryInterface, auditRepo repositoryInterfaces.AuditRepositoryInterface) serviceInterfaces.AuthServiceInterface {
	return &AuthService{userRepo: userRepo, auditRepo: auditRepo}
}

func (s *AuthService) Login(loginReq request.LoginRequest) (*model.UserAccount, int64, string, error) {
	now := time.Now()

	// 1. 로그인 검증 수행
	validationResult := s.validateLogin(loginReq)

	// 2. 검증 실패 시 로깅 및 에러 반환
	if !validationResult.IsValid {
		s.logLoginFailure(loginReq, validationResult.FailCode, now)

		// 비밀번호 불일치인 경우 실패 횟수 증가
		if validationResult.FailCode == "1" && validationResult.User != nil {
			s.userRepo.UpdateUserAccountLoginFailureByID(validationResult.User.LoginID)
		}

		return nil, 0, validationResult.FailCode, errors.New(validationResult.ErrorMsg)
	}

	if loginReq.Credentials.LoginID == loginReq.Credentials.Passwd {
		return validationResult.User, 0, "NO_INFO", errors.New("비밀번호 재설정 필요")
	}

	// 3. 로그인 성공 처리
	return s.handleLoginSuccess(validationResult.User, loginReq, now)
}

// validateLogin 로그인 검증 로직
func (s *AuthService) validateLogin(loginReq request.LoginRequest) LoginValidationResult {
	// 사용자 조회
	userAccount, err := s.userRepo.SelectUserAccountByID(loginReq.Credentials.LoginID)
	if err != nil || userAccount == nil {
		return LoginValidationResult{
			IsValid:  false,
			FailCode: "7",
			ErrorMsg: "아이디 혹은 비밀번호가 일치하지 않습니다",
			User:     nil,
		}
	}

	// 비밀번호 검증
	if util.HashPassword(loginReq.Passwd, userAccount.PwRef) != userAccount.Passwd {
		return LoginValidationResult{
			IsValid:  false,
			FailCode: "1",
			ErrorMsg: "아이디 혹은 비밀번호가 일치하지 않습니다",
			User:     userAccount,
		}
	}

	// 로그인 실패 횟수 검증
	if userAccount.PwFailCount >= 5 {
		return LoginValidationResult{
			IsValid:  false,
			FailCode: "2",
			ErrorMsg: "로그인 실패 5회 초과",
			User:     userAccount,
		}
	}

	// 비밀번호 만료 검증
	if userAccount.PasswdUpdateDate != nil && time.Since(*userAccount.PasswdUpdateDate) > 30*24*time.Hour {
		return LoginValidationResult{
			IsValid:  false,
			FailCode: "3",
			ErrorMsg: "비밀번호 변경 30일 초과",
			User:     userAccount,
		}
	}

	// IP 주소 검증
	if userAccount.ClientIP != "" && userAccount.ClientIP != loginReq.ClientIP {
		return LoginValidationResult{
			IsValid:  false,
			FailCode: "4",
			ErrorMsg: "IP 주소가 일치하지 않습니다",
			User:     userAccount,
		}
	}

	// 최근 접속일 검증
	if userAccount.RecentConnDate != nil && time.Since(*userAccount.RecentConnDate) > 15*24*time.Hour {
		return LoginValidationResult{
			IsValid:  false,
			FailCode: "5",
			ErrorMsg: "최근 접속 이후 15일 초과",
			User:     userAccount,
		}
	}

	return LoginValidationResult{
		IsValid:  true,
		FailCode: "",
		ErrorMsg: "",
		User:     userAccount,
	}
}

// logLoginFailure 로그인 실패 로깅
func (s *AuthService) logLoginFailure(loginReq request.LoginRequest, failCode string, loginTime time.Time) {
	s.auditRepo.InsertLoginFailureHistory(&model.LoginFailureHistory{
		FailCode:  failCode,
		LoginTime: &loginTime,
		LoginID:   loginReq.Credentials.LoginID,
		ClientIP:  loginReq.ClientIP,
		ServerIP:  loginReq.ServerIP,
	})
}

// logLoginSuccess 로그인 성공 로깅
func (s *AuthService) logLoginSuccess(userAccount *model.UserAccount, loginReq request.LoginRequest, loginTime time.Time) (int64, error) {
	return s.auditRepo.InsertLoginHistory(&model.LoginHistory{
		LoginID:    userAccount.LoginID,
		EmpName:    userAccount.EmpName,
		LoginTime:  &loginTime,
		IsExternal: "N",
		ClientIP:   loginReq.ClientIP,
		ServerIP:   loginReq.ServerIP,
	})
}

// handleLoginSuccess 로그인 성공 처리
func (s *AuthService) handleLoginSuccess(userAccount *model.UserAccount, loginReq request.LoginRequest, now time.Time) (*model.UserAccount, int64, string, error) {
	// 로그인 성공 로깅
	sessionID, err := s.logLoginSuccess(userAccount, loginReq, now)
	if err != nil {
		fmt.Printf("로그인 기록 저장 실패: %v\n", err)
		return nil, 0, "", errors.New("로그인 기록 저장 실패")
	}

	// 사용자 정보 업데이트
	updatedUserAccount := *userAccount
	updatedUserAccount.RecentConnDate = &now
	updatedUserAccount.PwFailCount = 0
	updatedUserAccount.ClientIP = loginReq.ClientIP

	if err := s.userRepo.UpdateUserAccountLoginSuccess(&updatedUserAccount); err != nil {
		fmt.Printf("사용자 정보 업데이트 실패: %v\n", err)
		return nil, 0, "", errors.New("사용자 정보 업데이트 실패")
	}

	return userAccount, sessionID, "", nil
}

// 로그아웃 서비스
func (s *AuthService) Logout(sessionID int64) error {
	if err := s.auditRepo.UpdateLoginHistoryLogoutTime(sessionID); err != nil {
		return fmt.Errorf("로그아웃 처리 실패: %w", err)
	}
	return nil
}

func (s *AuthService) GetUserInfo(loginID string) (*model.UserAccount, error) {
	user, err := s.userRepo.SelectUserAccountByID(loginID)
	if err != nil {
		return nil, fmt.Errorf("사용자 정보 조회 실패: %w", err)
	}
	return user, nil
}
