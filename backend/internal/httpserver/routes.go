// internal/server/routes.go
package httpserver

import (
	"lms/internal/handler"
	"lms/internal/handler/middleware"
	"lms/internal/service"

	"github.com/gorilla/mux"
)

type Routes struct {
	handlers       *handler.Handlers
	sessionService *service.SessionService
}

func NewRoutes(handlers *handler.Handlers, sessionService *service.SessionService) *Routes {
	return &Routes{
		handlers:       handlers,
		sessionService: sessionService,
	}
}

func (r *Routes) Setup(router *mux.Router) {
	r.setupAuthRoutes(router)
	r.setupUserRoutes(router)
	r.setupAuditRoutes(router)
}

// 1. 인증 관련 라우트
func (r *Routes) setupAuthRoutes(router *mux.Router) {
	auth := router.PathPrefix("/api/auth").Subrouter()

	// 인증 처리
	auth.HandleFunc("/login", r.handlers.Auth.LoginHandler).Methods("POST", "OPTIONS")
	auth.HandleFunc("/logout", r.handlers.Auth.LogoutHandler).Methods("POST", "OPTIONS")

	// 세션 관리
	auth.HandleFunc("/session", r.handlers.Auth.SessionHandler).Methods("GET", "OPTIONS")
}

// 2. 감사/로그 관련 라우트
func (r *Routes) setupAuditRoutes(router *mux.Router) {
	audit := router.PathPrefix("/api/audit").Subrouter()

	sessionMiddleware := middleware.SessionMiddleware(r.sessionService)
	audit.Use(sessionMiddleware)

	audit.HandleFunc("/login-history", r.handlers.Audit.LoginHistoryHandler).Methods("GET", "OPTIONS")
	audit.HandleFunc("/login-failure-history", r.handlers.Audit.LoginFailureHistoryHandler).Methods("GET", "OPTIONS")
	audit.HandleFunc("/login-reset-history", r.handlers.Audit.LoginResetHistoryHandler).Methods("GET", "OPTIONS")
}

// 3. 사용자 관리 라우트
func (r *Routes) setupUserRoutes(router *mux.Router) {
	sessionMiddleware := middleware.SessionMiddleware(r.sessionService)

	// 세션 검증이 필요 없는 라우트 (개별 등록)
	userWithNoMiddleware := router.PathPrefix("/api/user").Subrouter()
	userWithNoMiddleware.HandleFunc("/password-verification", r.handlers.User.PasswordVerificationHandler).Methods("POST", "OPTIONS")
	userWithNoMiddleware.HandleFunc("/password-update", r.handlers.User.PasswordUpdateHandler).Methods("POST", "OPTIONS")
	userWithNoMiddleware.HandleFunc("/password-reset", r.handlers.User.PasswordResetHandler).Methods("POST", "OPTIONS")

	// 세션 검증이 필요한 라우트
	userWithMiddleware := router.PathPrefix("/api/user").Subrouter()
	userWithMiddleware.Use(sessionMiddleware)
	userWithMiddleware.HandleFunc("/user-deletion", r.handlers.User.UserDeletionHandler).Methods("DELETE", "OPTIONS")
	userWithMiddleware.HandleFunc("/user-registration", r.handlers.User.UserRegistrationHandler).Methods("POST", "OPTIONS")
	userWithMiddleware.HandleFunc("/user-update", r.handlers.User.UserUpdateHandler).Methods("POST", "OPTIONS")
	userWithMiddleware.HandleFunc("/user-account-list", r.handlers.User.GetAllUsersHandler).Methods("GET", "OPTIONS")
}
