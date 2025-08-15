package interfaces

import "lms/internal/handler/dto/response"

type AuditServiceInterface interface {
	// // 로그인 실패 기록
	// RecordLoginFailure(code, loginID, clientIP, serverIP string) error

	// // 로그인 성공 기록
	// RecordLoginSuccess(loginID, clientIP, serverIP string) error

	// 로그인 이력 전체 조회
	GetLoginHistoryAll() ([]response.LoginHistoryItem, error)

	// 로그인 실패 이력 전체 조회
	GetLoginFailureHistoryAll() ([]response.LoginFailureHistoryResponse, error)

	// 로그인 리셋 이력 전체 조회
	GetLoginResetHistoryAll() ([]response.LoginResetResponse, error)
}
