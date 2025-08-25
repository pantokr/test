package interfaces

import "lms/internal/handler/dto/request"

type UserServiceInterface interface {
	// 사용자 등록
	RegisterUser(registerReq request.UserRegistrationRequest) error

	// 사용자 수정
	UpdateUser(updateReq request.UserUpdateRequest) error
}
