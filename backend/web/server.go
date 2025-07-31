package web

import (
	"log"
	"net/http"
	"time"

	"backend/config"
)

func Run() {

	RegisterAuthRoutes()
	RegisterLogsRoutes()

	go func() {
		for {
			func() {
				defer func() {
					if r := recover(); r != nil {
						log.Printf("웹 서버 패닉 발생: %v. 3초 후 재시작합니다.", r)
						time.Sleep(3 * time.Second)
					}
				}()

				port := config.Cfg.WebPort
				addr := "0.0.0.0" + ":" + port

				log.Printf("웹 서버 시작: %s", addr)

				if err := http.ListenAndServe(addr, nil); err != nil {
					log.Printf("웹 서버 오류 발생: %v", err)
					time.Sleep(3 * time.Second)
				}
			}()
		}
	}()
}
