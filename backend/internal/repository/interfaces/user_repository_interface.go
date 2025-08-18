package interfaces

import "lms/internal/model"

type UserRepositoryInterface interface {
	// 로그인 정보 관련 메서드
	// InsertUserAccount(user *model.UserAccount) error
	SelectUserAccountByID(userID string) (*model.UserAccount, error)
	UpdateUserAccountLoginFailure(loginID string) error
	UpdateUserAccountLoginSuccess(loginID string) error
}
