package service

import (
	"lms/internal/model"
	"lms/internal/model/request"
	"net/http"
)

type AuthService interface {
	Login(loginReq request.LoginRequest) (*model.UserAccount, error)
	Logout(w http.ResponseWriter, r *http.Request) (string, error)

	// 사용자 ID로 사용자 정보 조회
	GetUserInfo(userID string) (*model.UserAccount, error)

	GetLoginInfoAll() ([]model.LoginInfo, error)
	GetLoginFailAll() ([]model.LoginFail, error)
	GetLoginResetAll() ([]model.LoginReset, error)
}
