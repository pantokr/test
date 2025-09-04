package service

import (
	"fmt"
	"lms/internal/handler/dto/request"
	"lms/internal/model"
	repositoryInterfaces "lms/internal/repository/interfaces"
	serviceInterfaces "lms/internal/service/interfaces"
	"lms/internal/types"
	"lms/internal/util"
	"time"
)

type AuthService struct {
	userRepo  repositoryInterfaces.UserRepositoryInterface
	auditRepo repositoryInterfaces.AuditRepositoryInterface
}

func InitAuthService(userRepo repositoryInterfaces.UserRepositoryInterface, auditRepo repositoryInterfaces.AuditRepositoryInterface) serviceInterfaces.AuthServiceInterface {
	return &AuthService{userRepo: userRepo, auditRepo: auditRepo}
}

func (s *AuthService) Login(loginReq request.LoginRequest) *types.LoginResult {
	// 1. 로그인 검증 수행
	validationResult := s.validateLogin(loginReq)

	// 2. 검증 실패 시 처리
	if !validationResult.Success {
		return s.handleLoginFailure(loginReq, validationResult)
	}

	// 3. 비밀번호 재설정 필요 검사
	if loginReq.Credentials.LoginId == loginReq.Credentials.Passwd {
		return &types.LoginResult{
			Success:   false,
			User:      validationResult.User,
			SessionId: 0,
			Code:      "3",
			Message:   "비밀번호 재설정 필요",
		}
	}

	// 4. 로그인 성공 처리
	return s.handleLoginSuccess(validationResult.User, loginReq)
}

// validateLogin 로그인 검증 로직
func (s *AuthService) validateLogin(loginReq request.LoginRequest) *types.LoginResult {
	// 사용자 조회
	userAccount, err := s.userRepo.SelectUserAccountById(loginReq.Credentials.LoginId)
	if err != nil || userAccount == nil {
		return &types.LoginResult{
			Success: false,
			Code:    "7",
			Message: "아이디 혹은 비밀번호가 일치하지 않습니다",
			User:    nil,
		}
	}

	// 비밀번호 검증
	if util.HashPassword(loginReq.Credentials.Passwd, userAccount.PwRef) != userAccount.Passwd {
		return &types.LoginResult{
			Success: false,
			Code:    "1",
			Message: "아이디 혹은 비밀번호가 일치하지 않습니다",
			User:    userAccount,
		}
	}

	// 로그인 실패 횟수 검증
	if userAccount.PwFailCount >= 5 {
		return &types.LoginResult{
			Success: false,
			Code:    "2",
			Message: "로그인 실패 5회 초과",
			User:    userAccount,
		}
	}

	// 비밀번호 만료 검증
	if userAccount.PasswdUpdateDate != nil && time.Since(*userAccount.PasswdUpdateDate) > 30*24*time.Hour {
		return &types.LoginResult{
			Success: false, // 로그인 성공 처리
			Code:    "3",
			Message: "비밀번호 변경 30일 초과",
			User:    userAccount,
		}
	}

	// Ip 주소 검증

	if userAccount.ClientIp != "" && userAccount.ClientIp != loginReq.ClientIp {
		return &types.LoginResult{
			Success: false,
			Code:    "4",
			Message: fmt.Sprintf("IP(%s) 주소가 일치하지 않습니다 ", loginReq.ClientIp),
			User:    userAccount,
		}
	}

	// 최근 접속일 검증
	if userAccount.RecentConnDate != nil && time.Since(*userAccount.RecentConnDate) > 15*24*time.Hour {
		return &types.LoginResult{
			Success: false,
			Code:    "5",
			Message: "최근 접속 이후 15일 초과",
			User:    userAccount,
		}
	}

	return &types.LoginResult{
		Success: true,
		Code:    "",
		Message: "",
		User:    userAccount,
	}
}

// handleLoginFailure 로그인 실패 처리
func (s *AuthService) handleLoginFailure(loginReq request.LoginRequest, validationResult *types.LoginResult) *types.LoginResult {
	now := time.Now()

	// 로그인 실패 로깅
	s.auditRepo.InsertLoginFailureHistory(&model.LoginFailureHistory{
		FailCode:  validationResult.Code,
		LoginTime: &now,
		LoginId:   loginReq.Credentials.LoginId,
		ClientIp:  loginReq.ClientIp,
		ServerIp:  loginReq.ServerIp,
	})

	// 비밀번호 불일치인 경우 실패 횟수 증가
	if validationResult.Code == "1" && validationResult.User != nil {
		s.userRepo.UpdateUserAccountLoginFailureById(validationResult.User.LoginId)
	}

	// 검증 결과를 그대로 반환 (이미 LoginResult 형태)
	return validationResult
}

// handleLoginSuccess 로그인 성공 처리
func (s *AuthService) handleLoginSuccess(userAccount *model.UserAccount, loginReq request.LoginRequest) *types.LoginResult {
	now := util.NowPtr()

	// 로그인 성공 로깅 (DB에 로그인 기록 저장하고 SessionId 반환)
	sessionId, err := s.auditRepo.InsertLoginHistory(&model.LoginHistory{
		LoginId:    userAccount.LoginId,
		EmpName:    userAccount.EmpName,
		LoginTime:  now,
		IsExternal: "N",
		ClientIp:   loginReq.ClientIp,
		ServerIp:   loginReq.ServerIp,
	})
	if err != nil {
		fmt.Printf("로그인 기록 저장 실패: %v\n", err)
		return &types.LoginResult{
			Success:   false,
			User:      nil,
			SessionId: 0,
			Code:      "SYSTEM_ERROR",
			Message:   "로그인 기록 저장 실패",
		}
	}

	// 사용자 정보 업데이트 (최근 접속일, 실패 횟수 초기화, 클라이언트 Ip 업데이트)
	updatedUserAccount := *userAccount
	updatedUserAccount.RecentConnDate = now
	updatedUserAccount.PwFailCount = 0
	updatedUserAccount.ClientIp = loginReq.ClientIp

	if err := s.userRepo.UpdateUserAccountLoginSuccess(&updatedUserAccount); err != nil {
		fmt.Printf("사용자 정보 업데이트 실패: %v\n", err)
		return &types.LoginResult{
			Success:   false,
			User:      nil,
			SessionId: 0,
			Code:      "SYSTEM_ERROR",
			Message:   "사용자 정보 업데이트 실패",
		}
	}

	return &types.LoginResult{
		Success:   true,
		User:      userAccount,
		SessionId: sessionId, // 쿠키에 저장될 세션 Id
		Code:      "SUCCESS",
		Message:   "로그인 성공",
	}
}

// Logout 로그아웃 처리 (DB의 로그인 기록에 로그아웃 시간 업데이트)
func (s *AuthService) Logout(sessionId int64) error {
	if err := s.auditRepo.UpdateLoginHistoryLogoutTime(sessionId); err != nil {
		return fmt.Errorf("로그아웃 처리 실패: %w", err)
	}
	return nil
}

// GetUserInfo 사용자 정보 조회
func (s *AuthService) GetUserInfo(loginId string) (*model.UserAccount, error) {
	user, err := s.userRepo.SelectUserAccountById(loginId)
	if err != nil {
		return nil, fmt.Errorf("사용자 정보 조회 실패: %w", err)
	}
	return user, nil
}
