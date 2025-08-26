package interfaces

import "lms/internal/model"

type UserRepositoryInterface interface {
	// 로그인 정보 관련 메서드
	InsertUserAccount(user *model.UserAccount) error
	SelectUserAccountAll() ([]*model.UserAccount, error)
	SelectUserAccountByID(userID string) (*model.UserAccount, error)
	UpdateUserAccount(user *model.UserAccount) error
	UpdateUserAccountLoginFailureByID(loginID string) error
	UpdateUserAccountLoginSuccess(*model.UserAccount) error
}
