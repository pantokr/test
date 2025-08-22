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
func (s *SessionService) CreateSession(w http.ResponseWriter, r *http.Request, userID string, username string, sessionID int64) error {
	session, _ := s.store.Get(r, "lms-session")

	session.Values["id"] = userID
	session.Values["session_id"] = sessionID

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

	// 사용자 ID 추출
	userIDRaw, exists := session.Values["id"]
	if !exists {
		return nil, errors.New("세션에 사용자 ID가 없습니다")
	}

	userID, ok := userIDRaw.(string)
	if !ok || userID == "" {
		return nil, errors.New("유효하지 않은 사용자 ID입니다")
	}

	// 세션 ID 추출
	sessionIDRaw, exists := session.Values["session_id"]
	if !exists {
		return nil, errors.New("세션에 세션 ID가 없습니다")
	}

	sessionID, ok := sessionIDRaw.(int64)
	if !ok {
		if sessionIDStr, isString := sessionIDRaw.(string); isString {
			if parsedID, parseErr := strconv.ParseInt(sessionIDStr, 10, 64); parseErr == nil {
				sessionID = parsedID
			} else {
				return nil, errors.New("세션 ID 변환 실패")
			}
		} else {
			return nil, errors.New("유효하지 않은 세션 ID 타입")
		}
	}

	if sessionID <= 0 {
		return nil, errors.New("유효하지 않은 세션 ID 값")
	}

	username, _ := session.Values["username"].(string)

	return &middleware.SessionInfo{
		UserID:    userID,
		SessionID: sessionID,
		Username:  username,
		IsValid:   true,
	}, nil
}
