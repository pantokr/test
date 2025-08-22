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
	services *service.Services // 추가: Services 참조 저장
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
	repos := repository.NewRepositories(s.db)
	services := service.NewServices(repos)
	handlers := handler.NewHandlers(services)

	s.services = services // 추가: Services 참조 저장
	s.handlers = handlers
}

func (s *Server) setupRoutes() {
	// 공통 미들웨어
	s.router.Use(middleware.CORS)

	// 라우트 설정 (SessionService 전달)
	routes := NewRoutes(s.handlers, s.services.Session)
	routes.Setup(s.router)
}

func (s *Server) Run() error {
	addr := ":" + s.config.Server.Port
	log.Printf("서버 시작 %s", addr)
	return http.ListenAndServe(addr, s.router)
}
