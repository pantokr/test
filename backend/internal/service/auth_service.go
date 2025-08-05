package service

import (
	"errors"
	"lms/internal/model"
	"lms/internal/model/request"
	"lms/internal/repository"
	"lms/internal/util"
	"strings"

	"github.com/gorilla/sessions"
)

var store = sessions.NewCookieStore([]byte("super-secret-key"))

type AuthService struct {
	authRepo *repository.AuthRepository
}

func InitAuthService(authRepo *repository.AuthRepository) *AuthService {
	return &AuthService{authRepo: authRepo}
}

func (s *AuthService) Login(loginReq request.Login) (*model.UserAccount, error) {

	// 사용자 인증
	userAccount, err := s.authRepo.SelectUserByID(loginReq.Credentials.ID)
	if err != nil {
		return nil, errors.New("DB 조회 실패: " + err.Error())
	}
	if userAccount == nil {
		s.authRepo.InsertLoginFail("7", loginReq.Credentials.ID, loginReq.ClientIP, loginReq.ServerIP)
		return nil, errors.New("사용자 없음")
	}
	if util.HashPassword(loginReq.Passwd) != *userAccount.Passwd {
		s.authRepo.InsertLoginFail("1", loginReq.Credentials.ID, loginReq.ClientIP, loginReq.ServerIP)
		s.authRepo.UpdateLoginFail(*userAccount.ID)

		return nil, errors.New("비밀번호 불일치")
	}

	// // 로그인 제한 확인
	// if err := checkRestrictions(userAccount, clientIP, serverIP); err != nil {
	// 	return nil, err
	// }

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
func (s *AuthService) GetLoginInfoAll() ([]model.LoginInfo, error) {
	loginInfos, err := s.authRepo.SelectLoginInfoAll()
	if err != nil {
		return nil, err
	}
	return loginInfos, nil
}

// GetLoginFailAll : 모든 로그인 실패 정보 조회
func (s *AuthService) GetLoginFailAll() ([]model.LoginFail, error) {
	loginFails, err := s.authRepo.SelectLoginFailAll()
	if err != nil {
		return nil, err
	}
	return loginFails, nil
}

func (s *AuthService) GetLoginResetAll() ([]model.LoginReset, error) {
	loginResets, err := s.authRepo.SelectLoginResetAll()
	if err != nil {
		return nil, err
	}
	return loginResets, nil
}

func (s *AuthService) checkRestrictions(user *model.UserAccount, clientIP, serverIP string) error {
	// passwdUpdateDate := user.PasswdUpdateDate.Format("2006-01-02")
	// if time.Since(passwdUpdateDate) > 30*24*time.Hour {
	// 	s.authRepo.InsertLoginFail("2", *user.ID, clientIP, serverIP)
	// 	return errors.New("비밀번호 변경 30일 초과")
	// }

	if strings.ToUpper(*user.IsLongUnused) == "Y" {
		s.authRepo.InsertLoginFail("3", *user.ID, clientIP, serverIP)
		return errors.New("장기간 미사용 계정")
	}

	return nil
}
