package interfaces

import "lms/internal/model"

type AuthRepository interface {
	SelectUserByID(userID string) (*model.UserAccount, error)

	// 로그인 정보 관련 메서드
	InsertLoginInfo(userID, clientIP, serverIP string) error
	SelectLoginInfoAll() ([]model.LoginInfo, error)
	UpdateLogoutTime(userID string) error
	UpdateIsLongUnused(userID string) error
	UpdateLoginFail(userID string) error
	UpdateLoginSuccess(userID string) error

	// 로그인 실패 관련 메서드
	InsertLoginFail(failType, userID, clientIP, serverIP string) error
	SelectLoginFailAll() ([]model.LoginFail, error)

	// 로그인 리셋 관련 메서드
	InsertLoginReset(userID, clientIP, serverIP string) error
	SelectLoginResetAll() ([]model.LoginReset, error)
}
