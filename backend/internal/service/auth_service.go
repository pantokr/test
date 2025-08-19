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

func InitAuthService(userRepo repositoryInterfaces.UserRepositoryInterface, auditRepo repositoryInterfaces.AuditRepositoryInterface) serviceInterfaces.AuthServiceInterface {
	return &AuthService{userRepo: userRepo, auditRepo: auditRepo}
}

func (s *AuthService) Login(loginReq request.LoginRequest) (*model.UserAccount, int64, error) {
	userAccount, err := s.userRepo.SelectUserAccountByID(loginReq.Credentials.LoginID)
	if err != nil || userAccount == nil {
		s.auditRepo.InsertLoginFailureHistory("7", loginReq.Credentials.LoginID, loginReq.ClientIP, loginReq.ServerIP) // 실패 기록 로깅
		return nil, 0, errors.New("아이디 혹은 비밀번호가 일치하지 않습니다")
	}

	if util.HashPassword(loginReq.Passwd) != userAccount.Passwd {
		s.auditRepo.InsertLoginFailureHistory("1", userAccount.LoginID, loginReq.ClientIP, loginReq.ServerIP)
		s.userRepo.UpdateUserAccountLoginFailure(userAccount.LoginID)
		return nil, 0, errors.New("아이디 혹은 비밀번호가 일치하지 않습니다")
	}

	if userAccount.PwFailCount >= 5 {
		s.auditRepo.InsertLoginFailureHistory("2", userAccount.LoginID, loginReq.ClientIP, loginReq.ServerIP)
		return nil, 0, errors.New("로그인 실패 5회 초과")
	}

	if userAccount.PasswdUpdateDate != nil && time.Since(*userAccount.PasswdUpdateDate) > 30*24*time.Hour {
		s.auditRepo.InsertLoginFailureHistory("3", userAccount.LoginID, loginReq.ClientIP, loginReq.ServerIP)
		return nil, 0, errors.New("비밀번호 변경 30일 초과")
	}

	if userAccount.ClientIP != loginReq.ClientIP {
		s.auditRepo.InsertLoginFailureHistory("4", userAccount.LoginID, loginReq.ClientIP, loginReq.ServerIP)
		return nil, 0, errors.New("IP 주소가 일치하지 않습니다")
	}

	if userAccount.RecentConnDate != nil && time.Since(*userAccount.RecentConnDate) > 15*24*time.Hour {
		s.auditRepo.InsertLoginFailureHistory("5", userAccount.LoginID, loginReq.ClientIP, loginReq.ServerIP)
		return nil, 0, errors.New("최근 접속 이후 15일 초과")
	}

	sessionID, err := s.auditRepo.InsertLoginHistory(userAccount.LoginID, loginReq.ClientIP, loginReq.ServerIP)
	if err != nil {
		// 기록 실패해도 로그인에 영향 주지 않도록 로그만 남김
		fmt.Printf("로그인 기록 저장 실패: %v\n", err)
		sessionID = 0 // 실패시 0으로 설정
	}

	return userAccount, sessionID, nil
}

// 로그아웃 서비스 (신규)
func (s *AuthService) Logout(sessionID int64) error {

	// 로그아웃 시간 업데이트
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

func (s *AuthService) IsIdExists(id string) (bool, error) {
	user, err := s.userRepo.SelectUserAccountByID(id)
	if err != nil {
		return false, fmt.Errorf("사용자 ID 조회 실패: %w", err)
	}
	return user != nil, nil
}

func (s *AuthService) RegisterUser(registerReq *request.UserRegisterRequest) error {
	exists, err := s.IsIdExists(registerReq.LoginID)
	if err != nil {
		return err
	}
	if exists {
		return errors.New("사용자 ID가 이미 존재합니다")
	}

	// 비밀번호 해시 처리 (보안상 필수)
	registerReq.Passwd = util.HashPassword(registerReq.Passwd)

	// 추후 작업
	return nil
}
