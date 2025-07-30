package middleware

import (
	"net/http"

	"github.com/gorilla/sessions"
)

// 세션 스토어 초기화
var Store = sessions.NewCookieStore([]byte("super-secret-key"))

// 인증 미들웨어
func Auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		session, _ := Store.Get(r, "session-id")
		if _, ok := session.Values["id"]; !ok {
			http.Error(w, "인증 필요", http.StatusUnauthorized)
			return
		}
		next.ServeHTTP(w, r)
	})
}
