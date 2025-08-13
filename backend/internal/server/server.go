// internal/server/server.go
package server

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

type Server struct {
	config   *config.Config
	db       *database.DB
	router   *mux.Router
	handlers *handler.Handlers
}

func New(cfg *config.Config, db *database.DB) *Server {
	srv := &Server{
		config: cfg,
		db:     db,
		router: mux.NewRouter(),
	}

	srv.setupDependencies()
	srv.setupRoutes()

	return srv
}

func (s *Server) setupDependencies() {
	// Repository 초기화
	repos := &repository.Repositories{
		User:  repository.InitUserRepository(s.db),
		Audit: repository.InitAuditRepository(s.db),
	}

	// Service 초기화
	services := &service.Services{
		Auth: service.InitAuthService(repos.User, repos.Audit),
		// User:  service.InitUserService(repos.User, repos.Audit),
		Audit: service.InitAuditService(repos.Audit),
	}

	// Handler 초기화
	s.handlers = &handler.Handlers{
		Auth: handler.InitAuthHandler(services.Auth),
		// User:  handler.InitUserHandler(services.User, services.Auth),
		Audit: handler.InitAuditHandler(services.Audit),
	}
}

func (s *Server) setupRoutes() {
	// 공통 미들웨어
	s.router.Use(middleware.CORS)
	// 라우트 설정
	routes := NewRoutes(s.handlers)
	routes.Setup(s.router)
}

func (s *Server) Run() error {
	addr := ":" + s.config.Server.Port
	log.Printf("서버 시작 %s", addr)
	return http.ListenAndServe(addr, s.router)
}
