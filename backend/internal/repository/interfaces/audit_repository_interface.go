// internal/repository/interfaces/audit_repository_interface.go
package interfaces

import (
	"lms/internal/model"
)

type AuditRepositoryInterface interface {

	// 로그인 이력 관리
	SelectLoginHistoryAll() ([]model.LoginHistory, error)
	InsertLoginHistory(history *model.LoginHistory) (int64, error)
	UpdateLoginHistoryLogoutTime(sessionId int64) error

	// 로그인 실패 이력 관리
	InsertLoginFailureHistory(failure *model.LoginFailureHistory) error
	SelectLoginFailureHistoryAll() ([]model.LoginFailureHistory, error)

	// 로그인 리셋 이력 관리
	InsertLoginResetHistory(reset *model.LoginResetHistory) error
	SelectLoginResetHistoryAll() ([]model.LoginResetHistory, error)
}
