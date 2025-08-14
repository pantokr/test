// internal/repository/interfaces/audit_repository_interface.go
package interfaces

import (
	"lms/internal/handler/dto/response"
	"lms/internal/model"
)

type AuditRepositoryInterface interface {

	// 로그인 이력 관리
	SelectLoginHistoryAll() ([]model.LoginHistory, error)
	InsertLoginHistory(loginID, clientIP, serverIP string) error

	// 로그인 실패 이력 관리
	InsertLoginFailureHistory(failCode, loginID, clientIP, serverIP string) error
	SelectLoginFailureHistoryAll() ([]response.LoginFailureHistoryResponse, error)

	// 로그인 리셋 이력 관리
	InsertLoginResetHistory(resetCode, loginID, resetID, resetReason, prevLoginIP string) error
	SelectLoginResetHistoryAll() ([]response.LoginResetResponse, error)
}
