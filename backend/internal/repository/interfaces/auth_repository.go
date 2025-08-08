package interfaces

import "lms/internal/model"

type AuthRepository interface {
	// 로그인 정보 관련 메서드
	InsertUserAccount(user *model.UserAccount) error
	SelectUserAccountByID(userID string) (*model.UserAccount, error)
	UpdateUserAccountLoginFail(userID string) error
	UpdateUserAccountLoginSuccess(userID string) error
	UpdateUserAccountLogoutTime(userID string) error
	UpdateIsLongUnused(userID string) error

	// 로그인 정보 조회
	InsertLoginInfo(userID, clientIP, serverIP string) error
	SelectLoginInfoAll() ([]model.LoginHistory, error)

	// 로그인 실패 관련 메서드
	InsertLoginFail(failType, userID, clientIP, serverIP string) error
	SelectLoginFailAll() ([]model.LoginFailHistory, error)

	// 로그인 리셋 관련 메서드
	InsertLoginReset(userID, clientIP, serverIP string) error
	SelectLoginResetAll() ([]model.LoginResetHistory, error)
}
