// internal/repository/interfaces/audit_repository_interface.go
package interfaces

import (
	"lms/internal/handler/dto/response"
	"lms/internal/model"
)

type AuditRepositoryInterface interface {
	// 로그아웃 시간 업데이트
	UpdateUserAccountLogoutTime(loginID string) error

	// 로그인 실패 횟수 관리
	UpdateUserAccountLoginFail(loginID string) error
	UpdateUserAccountLoginSuccess(loginID string) error

	// 로그인 이력 관리
	SelectLoginHistoryAll() ([]model.LoginHistory, error)
	InsertLoginHistory(loginID, clientIP, serverIP string) error

	// 로그인 실패 이력 관리
	InsertLoginFailHistory(failCode, loginID, clientIP, serverIP string) error
	SelectLoginFailHistoryAll() ([]response.LoginFailResponse, error)

	// 로그인 리셋 이력 관리
	InsertLoginResetHistory(resetCode, loginID, resetID, resetReason, prevLoginIP string) error
	SelectLoginResetHistoryAll() ([]response.LoginResetResponse, error)
}
