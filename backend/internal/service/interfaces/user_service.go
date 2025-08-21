package interfaces

import "lms/internal/handler/dto/request"

type UserServiceInterface interface {
	// 사용자 등록
	RegisterUser(registerReq request.UserRegistrationRequest) error
}
