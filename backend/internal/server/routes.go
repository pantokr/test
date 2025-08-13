// internal/server/routes.go
package server

import (
	"lms/internal/handler"
	"lms/internal/handler/middleware"

	"github.com/gorilla/mux"
)

type Routes struct {
	handlers *handler.Handlers
}

func NewRoutes(handlers *handler.Handlers) *Routes {
	return &Routes{handlers: handlers}
}

func (r *Routes) Setup(router *mux.Router) {
	r.setupAuthRoutes(router)
	// r.setupUserRoutes(router)
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

// 2. 사용자 관리 라우트
// func (r *Routes) setupUserRoutes(router *mux.Router) {
// 	user := router.PathPrefix("/api/users").Subrouter()

// 	// 인증 불필요한 라우트
// 	user.HandleFunc("/register", r.handlers.User.RegisterHandler).Methods("POST", "OPTIONS")
// 	user.HandleFunc("/check-id", r.handlers.User.CheckIdExistsHandler).Methods("POST", "OPTIONS")
// 	user.HandleFunc("/check-email", r.handlers.User.CheckEmailExistsHandler).Methods("POST", "OPTIONS")

// 	// 인증이 필요한 라우트
// 	userProtected := user.PathPrefix("").Subrouter()
// 	userProtected.Use(middleware.AuthMiddleware)

// 	// 개인 정보 관리
// 	userProtected.HandleFunc("/me", r.handlers.User.GetMyProfileHandler).Methods("GET", "OPTIONS")
// 	userProtected.HandleFunc("/me", r.handlers.User.UpdateMyProfileHandler).Methods("PUT", "OPTIONS")
// 	userProtected.HandleFunc("/me/password", r.handlers.User.ChangePasswordHandler).Methods("PUT", "OPTIONS")

// 	// 사용자 관리 (관리자용)
// 	userProtected.HandleFunc("", r.handlers.User.GetUsersHandler).Methods("GET", "OPTIONS")
// 	userProtected.HandleFunc("/{userID}", r.handlers.User.GetUserHandler).Methods("GET", "OPTIONS")
// 	userProtected.HandleFunc("/{userID}", r.handlers.User.UpdateUserHandler).Methods("PUT", "OPTIONS")
// 	userProtected.HandleFunc("/{userID}/status", r.handlers.User.UpdateUserStatusHandler).Methods("PUT", "OPTIONS")
// }

// 3. 감사/로그 관련 라우트
func (r *Routes) setupAuditRoutes(router *mux.Router) {
	audit := router.PathPrefix("/api/audit").Subrouter()
	audit.Use(middleware.CORS) // 모든 감사 로그는 인증 필요

	audit.HandleFunc("/login-history", r.handlers.Audit.LoginHistoryHandler).Methods("GET", "OPTIONS")

	// 로그인 통계 및 분석
	audit.HandleFunc("/login-failures", r.handlers.Audit.LoginFailureHistoryHandler).Methods("GET", "OPTIONS")
}
