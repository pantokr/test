package service

import (
	"lms/internal/model"
	"lms/internal/model/request"
	"net/http"
)

func Login(loginReq request.Login) (*model.UserAccount, error)
func Logout(w http.ResponseWriter, r *http.Request) (string, error)

// 사용자 ID로 사용자 정보 조회
func GetUserInfo(userID string) (*model.UserAccount, error)

func GetLoginInfoAll() ([]model.LoginInfo, error)
func GetLoginFailAll() ([]model.LoginFail, error)
func GetLoginResetAll() ([]model.LoginReset, error)
