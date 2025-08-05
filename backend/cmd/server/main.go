package main

import (
	"log"
	"net/http"

	"lms/internal/config"
	"lms/internal/handler"
	"lms/internal/handler/middleware"
	"lms/internal/repository"
	"lms/internal/service"
	"lms/pkg/database"

	"github.com/gorilla/mux"
)

func main() {
	// 설정 로드
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("설정 로드 실패: %v", err)
	}

	// 환경 모드 출력
	if cfg.IsDevelopment() {
		log.Println("개발 모드로 실행")
	} else if cfg.IsProduction() {
		log.Println("프로덕션 모드로 실행")
	}

	// DB 초기화
	db, err := database.InitMySQL(cfg)
	if err != nil {
		log.Fatalf("데이터베이스 초기화 실패: %v", err)
	}
	defer db.Close()

	// Repository → Service → Handler 주입
	authRepo := repository.InitAuthRepository(db)
	authService := service.InitAuthService(authRepo)
	handler := handler.InitAuthHandler(authService)

	// 라우터 설정
	r := mux.NewRouter()

	// 공통 미들웨어 등록
	r.Use(middleware.CORS)

	// Auth API
	api := r.PathPrefix("/api/auth").Subrouter()
	api.HandleFunc("/login", handler.LoginHandler).Methods("POST", "OPTIONS")
	api.HandleFunc("/logout", handler.LogoutHandler).Methods("POST", "OPTIONS")
	api.HandleFunc("/me", handler.MeHandler).Methods("GET", "OPTIONS")
	api.HandleFunc("/login-info", handler.LoginInfoHandler).Methods("GET", "OPTIONS")
	api.HandleFunc("/login-fail", handler.LoginFailHandler).Methods("GET", "OPTIONS")
	api.HandleFunc("/login-reset", handler.LoginResetHandler).Methods("GET", "OPTIONS")

	//api.HandleFunc("/me", handler.MeHandler).Methods("GET")

	// 서버 시작
	addr := ":" + cfg.Server.Port
	log.Printf("서버 시작 %s", addr)
	if err := http.ListenAndServe(addr, r); err != nil {
		log.Fatalf("서버 실행 실패: %v", err)
	}
}
