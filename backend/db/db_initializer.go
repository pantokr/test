package db

import (
	"backend/config"
	"database/sql"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql" // MySQL driver
)

var database *sql.DB

func Init() {
	var err error
	database, err = sql.Open("mysql", config.Cfg.Dsn)
	if err != nil {
		log.Printf("데이터베이스 연결 실패: %v\n", err)
		os.Exit(1)
	}
}

func GetDatabase() *sql.DB {
	return database
}
