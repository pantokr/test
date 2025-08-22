// internal/handler/middleware/session.go
package middleware

import (
	"context"
	"lms/internal/util"
	"log"
	"net/http"
)

// 세션 스토어 초기화
type SessionValidator interface {
	ValidateSession(r *http.Request) (*SessionInfo, error)
}

type SessionInfo struct {
	UserID    string
	Username  string
	SessionID int64
	IsValid   bool
}

type sessionContextKey struct{}

// gorilla/mux용 미들웨어 시그니처로 변경
func SessionMiddleware(sessionValidator SessionValidator) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// 세션 검증
			sessionInfo, err := sessionValidator.ValidateSession(r)
			if err != nil || !sessionInfo.IsValid {
				log.Printf("세션 검증 실패: %v", err)
				util.RespondError(w, http.StatusUnauthorized, "세션 검증 실패", "")
				return
			}

			// context에 세션 정보 추가
			ctx := context.WithValue(r.Context(), sessionContextKey{}, sessionInfo)

			// 다음 핸들러 실행
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

// context에서 세션 정보 가져오는 헬퍼 함수
func GetSessionInfo(r *http.Request) (*SessionInfo, bool) {
	sessionInfo, ok := r.Context().Value(sessionContextKey{}).(*SessionInfo)
	return sessionInfo, ok
}
