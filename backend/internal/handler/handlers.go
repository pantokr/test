// internal/handler/handlers.go
package handler

import (
	"lms/internal/service"
)

// Handlers는 모든 핸들러들을 관리하는 구조체입니다
type Handlers struct {
	Auth *AuthHandler
	// User  *UserHandler
	Audit *AuditHandler
}

// NewHandlers는 서비스들을 받아서 핸들러들을 초기화합니다
func NewHandlers(services *service.Services) *Handlers {
	return &Handlers{
		Auth: InitAuthHandler(services.Auth),
		// User:  InitUserHandler(services.User, services.Auth), // 주석 처리된 상태 유지
		Audit: InitAuditHandler(services.Audit),
	}
}
