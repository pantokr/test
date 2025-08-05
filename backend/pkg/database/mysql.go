// pkg/database/mysql.go
package database

import (
	"database/sql"
	"fmt"
	"lms/internal/config"
	"log"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

type DB struct {
	*sql.DB
}

// InitMySQL은 MySQL 데이터베이스 연결을 초기화합니다
func InitMySQL(cfg *config.Config) (*DB, error) {

	db, err := sql.Open("mysql", cfg.Database.DSN)
	if err != nil {
		return nil, fmt.Errorf("데이터베이스 연결 실패: %w", err)
	}

	// 연결 풀 설정
	db.SetMaxOpenConns(25)                 // 최대 연결 수
	db.SetMaxIdleConns(25)                 // 최대 유휴 연결 수
	db.SetConnMaxLifetime(5 * time.Minute) // 연결 최대 수명

	// 연결 테스트
	if err := db.Ping(); err != nil {
		db.Close()
		return nil, fmt.Errorf("데이터베이스 연결 테스트 실패: %w", err)
	}

	log.Println("MySQL 데이터베이스 연결 성공")
	return &DB{db}, nil
}

// HealthCheck는 데이터베이스 연결 상태를 확인합니다
func (db *DB) HealthCheck() error {
	return db.Ping()
}

// Close는 데이터베이스 연결을 종료합니다
func (db *DB) Close() error {
	log.Println("데이터베이스 연결 종료")
	return db.DB.Close()
}

// GetStats는 연결 풀 통계를 반환합니다
func (db *DB) GetStats() sql.DBStats {
	return db.Stats()
}
