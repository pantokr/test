package service

import (
	"errors"
	"fmt"
	"lms/internal/handler/dto/request"
	"lms/internal/handler/dto/response"
	"lms/internal/model"
	"lms/internal/repository"
	"lms/internal/util"
	"time"
)

type AuthService struct {
	authRepo *repository.AuthRepository
}

func InitAuthService(authRepo *repository.AuthRepository) *AuthService {
	return &AuthService{authRepo: authRepo}
}

func (s *AuthService) Login(loginReq request.LoginRequest) (*model.UserAccount, error) {
	userAccount, err := s.authRepo.SelectUserAccountByID(loginReq.Credentials.LoginID)
	if err != nil || userAccount == nil {
		s.failLogin("7", loginReq.Credentials.LoginID, loginReq.ClientIP, loginReq.ServerIP)
		fmt.Printf("비밀번호가 일치하지 않습니다: %s", loginReq.Credentials.LoginID)
		fmt.Printf("비밀번호가 일치하지 않습니다: %s", loginReq.Credentials.Passwd)
		return nil, errors.New("아이디 혹은 비밀번호가 일치하지 않습니다")
	}

	if util.HashPassword(loginReq.Passwd) != *userAccount.Passwd {
		s.failLogin("1", *userAccount.LoginID, loginReq.ClientIP, loginReq.ServerIP)

		return nil, errors.New("아이디 혹은 비밀번호가 일치하지 않습니다")
	}

	if *userAccount.PwFailCount >= 5 {
		s.failLogin("2", *userAccount.LoginID, loginReq.ClientIP, loginReq.ServerIP)
		return nil, errors.New("로그인 실패 5회 초과")
	}

	if userAccount.PasswdUpdateDate != nil && time.Since(*userAccount.PasswdUpdateDate) > 30*24*time.Hour {
		s.failLogin("3", *userAccount.LoginID, loginReq.ClientIP, loginReq.ServerIP)
		return nil, errors.New("비밀번호 변경 30일 초과")
	}

	if userAccount.ClientIP != nil && *userAccount.ClientIP != loginReq.ClientIP {
		s.failLogin("4", *userAccount.LoginID, loginReq.ClientIP, loginReq.ServerIP)
		return nil, errors.New("IP 주소가 일치하지 않습니다")
	}

	if userAccount.RecentConnDate != nil && time.Since(*userAccount.RecentConnDate) > 15*24*time.Hour {
		s.failLogin("5", *userAccount.LoginID, loginReq.ClientIP, loginReq.ServerIP)
		return nil, errors.New("최근 접속 이후 15일 초과")
	}

	// 로그인 성공 처리
	if err := s.authRepo.UpdateUserAccountLoginSuccess(*userAccount.LoginID); err != nil {
		return nil, fmt.Errorf("로그인 성공 처리 실패: %w", err)
	}

	if err := s.authRepo.InsertLoginInfo(*userAccount.LoginID, loginReq.ClientIP, loginReq.ServerIP); err != nil {
		return nil, fmt.Errorf("로그인 이력 저장 실패: %w", err)
	}

	return userAccount, nil
}

func (s *AuthService) failLogin(code, loginID, clientIP, serverIP string) {
	s.authRepo.InsertLoginFail(code, loginID, clientIP, serverIP)
	s.authRepo.UpdateUserAccountLoginFail(loginID)
}

func (s *AuthService) Logout(userID string) error {
	if err := s.authRepo.UpdateUserAccountLogoutTime(userID); err != nil {
		return fmt.Errorf("로그아웃 처리 실패: %w", err)
	}
	return nil
}

func (s *AuthService) IsIdExists(id string) (bool, error) {
	user, err := s.authRepo.SelectUserAccountByID(id)
	if err != nil {
		return false, fmt.Errorf("사용자 ID 조회 실패: %w", err)
	}
	return user != nil, nil
}

func (s *AuthService) RegisterUser(registerReq *request.UserRegisterRequest) error {
	exists, err := s.IsIdExists(*registerReq.LoginID)
	if err != nil {
		return err
	}
	if exists {
		return errors.New("사용자 ID가 이미 존재합니다")
	}

	// 비밀번호 해시 처리 (보안상 필수)
	*registerReq.Passwd = util.HashPassword(*registerReq.Passwd)

	if err := s.authRepo.InsertUserAccount(*registerReq); err != nil {
		return fmt.Errorf("사용자 등록 실패: %w", err)
	}
	return nil
}

func (s *AuthService) GetUserInfo(userID string) (*model.UserAccount, error) {
	user, err := s.authRepo.SelectUserAccountByID(userID)
	if err != nil {
		return nil, fmt.Errorf("사용자 정보 조회 실패: %w", err)
	}
	return user, nil
}

func (s *AuthService) GetLoginHistoryAll() ([]response.LoginHistoryResponse, error) {
	data, err := s.authRepo.SelectLoginHistoryAll()
	if err != nil {
		return nil, fmt.Errorf("로그인 이력 조회 실패: %w", err)
	}
	var responses []response.LoginHistoryResponse
	for _, login := range data {
		var response response.LoginHistoryResponse
		response.LoginHistoryResponseFromModel(login)
		responses = append(responses, response)
	}

	return responses, nil
}

func (s *AuthService) GetLoginFailAll() ([]response.LoginFailResponse, error) {
	data, err := s.authRepo.SelectLoginFailAll()
	if err != nil {
		return nil, fmt.Errorf("로그인 실패 이력 조회 실패: %w", err)
	}
	return data, nil
}

func (s *AuthService) GetLoginResetAll() ([]response.LoginResetResponse, error) {
	data, err := s.authRepo.SelectLoginResetAll()
	if err != nil {
		return nil, fmt.Errorf("로그인 리셋 이력 조회 실패: %w", err)
	}
	return data, nil
}
