package interfaces

import (
	"lms/internal/handler/dto/request"
	"lms/internal/model"
)

type AuthServiceInterface interface {
	// 로그인 처리
	Login(loginReq request.LoginRequest) (*model.UserAccount, int64, error)

	// 로그아웃 처리
	Logout(sessionID int64) error

	// 사용자 정보 조회
	GetUserInfo(loginID string) (*model.UserAccount, error)

	// 사용자 ID 존재 여부 확인
	IsIdExists(id string) (bool, error)

	// 사용자 등록
	RegisterUser(registerReq *request.UserRegisterRequest) error
}
