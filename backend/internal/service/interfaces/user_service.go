package interfaces

import (
	"lms/internal/handler/dto/request"
	"lms/internal/model"
)

type UserServiceInterface interface {
	// 사용자 등록
	RegisterUser(registerReq request.UserRegistrationRequest) error

	// 사용자 수정
	UpdateUser(updateReq request.UserUpdateRequest) error

	// 비밀번호 수정
	UpdatePassword(updateReq request.PasswordUpdateRequest) error

	// 비밀번호 검증
	VerifyPassword(verifyReq request.Credentials) error

	// 모든 사용자 조회
	GetAllUsers() ([]*model.UserAccount, error)
}
