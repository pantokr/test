// internal/service/session_service.go
package service

import (
	"errors"
	"lms/internal/handler/middleware"
	"net/http"
	"strconv"

	"github.com/gorilla/sessions"
)

type SessionService struct {
	store *sessions.CookieStore
}

func InitSessionService() *SessionService {
	store := sessions.NewCookieStore([]byte("secret-key"))
	return &SessionService{
		store: store,
	}
}

// 세션 생성
func (s *SessionService) CreateSession(w http.ResponseWriter, r *http.Request, userId string, username string, sessionId int64) error {
	session, _ := s.store.Get(r, "lms-session")

	session.Values["id"] = userId
	session.Values["session_id"] = sessionId

	session.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   20 * 60, // 20분
		HttpOnly: true,
		SameSite: http.SameSiteStrictMode,
		Secure:   false,
	}

	return session.Save(r, w)
}

func (s *SessionService) ExtendSession(w http.ResponseWriter, r *http.Request) error {
	session, _ := s.store.Get(r, "lms-session")

	// 새로운 MaxAge로 쿠키 갱신
	session.Options.MaxAge = 20 * 60 // 20분 연장

	return session.Save(r, w)
}

// 세션 삭제
func (s *SessionService) DestroySession(w http.ResponseWriter, r *http.Request) error {
	session, err := s.store.Get(r, "lms-session")
	if err != nil {
		return err
	}

	session.Options.MaxAge = -1
	return session.Save(r, w)
}

// 세션 검증 (미들웨어용)
func (s *SessionService) ValidateSession(r *http.Request) (*middleware.SessionInfo, error) {
	session, err := s.store.Get(r, "lms-session")
	if err != nil || session == nil || session.IsNew {
		return nil, errors.New("유효하지 않은 세션입니다")
	}

	// 사용자 Id 추출
	userIdRaw, exists := session.Values["id"]
	if !exists {
		return nil, errors.New("세션에 사용자 Id가 없습니다")
	}

	userId, ok := userIdRaw.(string)
	if !ok || userId == "" {
		return nil, errors.New("유효하지 않은 사용자 Id입니다")
	}

	// 세션 Id 추출
	sessionIdRaw, exists := session.Values["session_id"]
	if !exists {
		return nil, errors.New("세션에 세션 Id가 없습니다")
	}

	sessionId, ok := sessionIdRaw.(int64)
	if !ok {
		if sessionIdStr, isString := sessionIdRaw.(string); isString {
			if parsedId, parseErr := strconv.ParseInt(sessionIdStr, 10, 64); parseErr == nil {
				sessionId = parsedId
			} else {
				return nil, errors.New("세션 Id 변환 실패")
			}
		} else {
			return nil, errors.New("유효하지 않은 세션 Id 타입")
		}
	}

	if sessionId <= 0 {
		return nil, errors.New("유효하지 않은 세션 Id 값")
	}

	return &middleware.SessionInfo{
		UserId:    userId,
		SessionId: sessionId,
		IsValid:   true,
	}, nil
}
