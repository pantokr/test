package interfaces

import (
	"lms/internal/handler/dto/response"
)

type AuditServiceInterface interface {
	FailLogin(code, loginID, clientIP, serverIP string)
	GetLoginHistoryAll() ([]response.LoginHistoryResponse, error)
	GetLoginFailHistoryAll() ([]response.LoginFailResponse, error)
	GetLoginResetHistoryAll() ([]response.LoginResetResponse, error)
}
