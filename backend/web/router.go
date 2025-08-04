package web

import (
	"backend/handler/auth"
	"backend/handler/logs"
	"backend/middleware"
	"net/http"
)

func RegisterAuthRoutes() {
	http.Handle("/api/login", middleware.CORS(http.HandlerFunc(auth.LoginHandler)))
	http.Handle("/api/logout", middleware.CORS(http.HandlerFunc(auth.LogoutHandler)))
	http.Handle("/api/me", middleware.CORS(http.HandlerFunc(auth.MeHandler)))
	// 추가 라우트 등록 가능
}

func RegisterLogsRoutes() {
	http.Handle("/api/login-info", middleware.CORS(http.HandlerFunc(logs.LoginInfoHandler)))
	http.Handle("/api/login-fail", middleware.CORS(http.HandlerFunc(logs.LoginFailHandler)))
	http.Handle("/api/login-reset", middleware.CORS(http.HandlerFunc(logs.LoginResetHandler)))
	// 추가 라우트 등록 가능
}
