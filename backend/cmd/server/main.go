package main

import (
	"log"

	"lms/internal/config"
	"lms/internal/server"
	"lms/pkg/database"
)

func main() {
	// 설정 로드
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("설정 로드 실패: %v", err)
	}

	// 환경 모드 출력
	logEnvironmentMode(cfg)

	// DB 초기화
	db, err := database.InitMySQL(cfg)
	if err != nil {
		log.Fatalf("데이터베이스 초기화 실패: %v", err)
	}
	defer db.Close()

	// 서버 초기화 및 실행
	srv := server.New(cfg, db)
	if err := srv.Run(); err != nil {
		log.Fatalf("서버 실행 실패: %v", err)
	}
}

func logEnvironmentMode(cfg *config.Config) {
	if cfg.IsDevelopment() {
		log.Println("개발 모드로 실행")
	} else if cfg.IsProduction() {
		log.Println("프로덕션 모드로 실행")
	}
}
