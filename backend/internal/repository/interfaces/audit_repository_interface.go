// internal/repository/interfaces/audit_repository_interface.go
package interfaces

import (
	"lms/internal/model"
)

type AuditRepositoryInterface interface {

	// 로그인 이력 관리
	SelectLoginHistoryAll() ([]model.LoginHistory, error)
	InsertLoginHistory(loginID, clientIP, serverIP string) (int64, error)
	UpdateLoginHistoryLogoutTime(sessionID int64) error

	// 로그인 실패 이력 관리
	InsertLoginFailureHistory(failCode, loginID, clientIP, serverIP string) error
	SelectLoginFailureHistoryAll() ([]model.LoginFailureHistory, error)

	// 로그인 리셋 이력 관리
	InsertLoginResetHistory(resetCode, loginID, resetID, resetReason, prevLoginIP string) error
	SelectLoginResetHistoryAll() ([]model.LoginResetHistory, error)
}
