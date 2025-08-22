// internal/service/interfaces/auth_service_interface.go
package interfaces

import (
	"lms/internal/handler/dto/request"
	"lms/internal/model"
)

// AuthServiceInterface 인증 서비스 인터페이스
type AuthServiceInterface interface {
	Login(loginReq request.LoginRequest) (*model.UserAccount, int64, string, error)
	Logout(sessionID int64) error
	GetUserInfo(loginID string) (*model.UserAccount, error)
}
