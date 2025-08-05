package service

import (
	"errors"
	"lms/internal/model"
	"lms/internal/model/request"
	"lms/internal/model/response"
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

	// 사용자 인증
	userAccount, err := s.authRepo.SelectUserByID(loginReq.Credentials.ID)
	if err != nil || userAccount == nil {
		s.authRepo.InsertLoginFail("7", loginReq.Credentials.ID, loginReq.ClientIP, loginReq.ServerIP)
		return nil, errors.New("아이디 혹은 비밀번호가 일치하지 않습니다")
	}

	// 비밀번호 확인
	if util.HashPassword(loginReq.Passwd) != *userAccount.Passwd {
		s.authRepo.InsertLoginFail("1", loginReq.Credentials.ID, loginReq.ClientIP, loginReq.ServerIP)
		s.authRepo.UpdateLoginFail(*userAccount.ID)
		return nil, errors.New("아이디 혹은 비밀번호가 일치하지 않습니다")
	}

	if time.Since(*userAccount.PasswdUpdateDate) > 30*24*time.Hour {
		s.authRepo.InsertLoginFail("2", *userAccount.ID, loginReq.ClientIP, loginReq.ServerIP)
		return nil, errors.New("비밀번호 변경 30일 초과")
	}

	if time.Since(*userAccount.RecentConnDate) > 15*24*time.Hour {
		s.authRepo.UpdateIsLongUnused(*userAccount.ID)
		s.authRepo.InsertLoginFail("3", *userAccount.ID, loginReq.ClientIP, loginReq.ServerIP)
		return nil, errors.New("최근 접속 이후 15일 초과")
	}

	// 로그인 실패 횟수 확인
	if *userAccount.PwFailCount >= 5 {
		s.authRepo.InsertLoginFail("4", *userAccount.ID, loginReq.ClientIP, loginReq.ServerIP)
		return nil, errors.New("로그인 실패 5회 초과")
	}

	// 로그인 성공 로그 저장
	s.authRepo.InsertLoginInfo(*userAccount.ID, loginReq.ClientIP, loginReq.ServerIP)

	return userAccount, nil
}

func (s *AuthService) Logout(userID string) error {
	// 로그아웃 시간 업데이트만 담당
	if err := s.authRepo.UpdateLogoutTime(userID); err != nil {
		return err
	}
	return nil
}

// 사용자 ID로 사용자 정보 조회
func (s *AuthService) GetUserInfo(userID string) (*model.UserAccount, error) {
	userAccount, err := s.authRepo.SelectUserByID(userID)
	if err != nil {
		return nil, err
	}

	return userAccount, nil
}

// GetLoginInfoAll : 모든 로그인 정보 조회
func (s *AuthService) GetLoginInfoAll() ([]response.LoginInfoResponse, error) {
	loginInfos, err := s.authRepo.SelectLoginInfoAll()
	if err != nil {
		return nil, err
	}
	return loginInfos, nil
}

// GetLoginFailAll : 모든 로그인 실패 정보 조회
func (s *AuthService) GetLoginFailAll() ([]response.LoginFailResponse, error) {
	loginFails, err := s.authRepo.SelectLoginFailAll()
	if err != nil {
		return nil, err
	}
	return loginFails, nil
}

func (s *AuthService) GetLoginResetAll() ([]response.LoginResetResponse, error) {
	loginResets, err := s.authRepo.SelectLoginResetAll()
	if err != nil {
		return nil, err
	}
	return loginResets, nil
}
