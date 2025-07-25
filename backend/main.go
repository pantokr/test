package main

import (
	"log"

	"backend/db"
	"backend/web"
)

func main() {
	dsn := "root:root@tcp(localhost:3306)/new_db?parseTime=true&loc=Local"

	if err := db.Init(dsn); err != nil {
		log.Fatalf("DB 연결 실패: %v", err)
	}

	if err := web.Run("localhost:8080"); err != nil {
		log.Fatalf("서버 실행 실패: %v", err)
	}
}
