package interfaces

import "lms/internal/model"

type UserRepositoryInterface interface {
	// 로그인 정보 관련 메서드
	InsertUserAccount(user *model.UserAccount) error
	SelectUserAccountAll() ([]*model.UserAccount, error)
	SelectUserAccountById(userId string) (*model.UserAccount, error)
	UpdateUserAccount(user *model.UserAccount) error
	UpdateUserAccountLoginFailureById(loginId string) error
	UpdateUserAccountLoginSuccess(*model.UserAccount) error
	DeleteUserAccountById(userId string) error
}
