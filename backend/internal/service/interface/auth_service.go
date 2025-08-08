package service

import (
	"lms/internal/handler/dto/request"
	"lms/internal/model"
	"net/http"
)

type AuthService interface {
	Login(loginReq request.LoginRequest) (*model.UserAccount, error)
	Logout(w http.ResponseWriter, r *http.Request) (string, error)
	IsIdExists(id string) (bool, error)
	RegisterUser(registerReq request.UserRegisterRequest) error

	// 사용자 ID로 사용자 정보 조회
	GetUserInfo(userID string) (*model.UserAccount, error)

	GetLoginHistoryAll() ([]model.LoginHistory, error)
	GetLoginFailHistoryAll() ([]model.LoginFailHistory, error)
	GetLoginResetHistoryAll() ([]model.LoginResetHistory, error)
}
