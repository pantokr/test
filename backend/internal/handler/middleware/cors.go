package middleware

import (
	"net/http"
)

func CORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")

		if origin != "" {
			// Origin을 그대로 내려주거나, 화이트리스트 체크
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Vary", "Origin") // 캐시 문제 방지
			w.Header().Set("Access-Control-Allow-Credentials", "true")
		}

		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept")

		// Preflight 요청 처리
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent) // 204가 일반적
			return
		}

		next.ServeHTTP(w, r)
	})
}
