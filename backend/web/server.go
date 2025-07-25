package webserver

import (
	"backend/handler"
	"fmt"
	"net/http"
)

func Run(addr string) error {
	// React build 경로 (운영 환경에 맞게 조정하세요)
	buildDir := "C:\\workplaces\\mcirni\\frontend\\build"

	// /loans API 라우팅 + CORS 적용
	http.Handle("/loans", withCORS(http.HandlerFunc(handler.NewLoanReviewHandler)))

	// 정적 파일 서빙
	fs := http.FileServer(http.Dir(buildDir))
	http.Handle("/static/", fs)

	// SPA 대응: 모든 요청을 index.html로
	// http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	// 	indexPath := filepath.Join(buildDir, "index.html")
	// 	http.ServeFile(w, r, indexPath)
	// })

	fmt.Println("🚀 서버 실행되고 있습니다.:", addr)
	return http.ListenAndServe(addr, nil)
}

// CORS 미들웨어
func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000") // React 개발서버 주소
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}
