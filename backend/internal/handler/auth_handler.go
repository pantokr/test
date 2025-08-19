package handler

import (
	"encoding/json"
	"lms/internal/config"
	"lms/internal/handler/dto/request"
	"lms/internal/handler/dto/response"
	"lms/internal/service/interfaces"
	"lms/internal/util"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/sessions"
)

type AuthHandler struct {
	authService interfaces.AuthServiceInterface
}

var store = sessions.NewCookieStore([]byte("secret-key"))

// InitAuthHandler - AuthHandler 초기화
func InitAuthHandler(authService interfaces.AuthServiceInterface) *AuthHandler {
	return &AuthHandler{
		authService: authService,
	}
}

// 로그인 핸들러
func (h *AuthHandler) LoginHandler(w http.ResponseWriter, r *http.Request) {
	// JSON 디코딩
	var creds request.Credentials
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, "잘못된 요청입니다.", http.StatusBadRequest)
		return
	}

	clientIP := util.GetClientIP(r)
	serverIP := config.GetConfig().LocalIP

	loginReq := request.LoginRequest{
		Credentials: creds,
		ClientIP:    clientIP,
		ServerIP:    serverIP,
	}

	userAccount, sessionID, err := h.authService.Login(loginReq)
	if err != nil {
		log.Printf("로그인 실패: %v", err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	// 세션 생성
	session, _ := store.Get(r, "lms-session")
	session.Values["id"] = userAccount.LoginID // 기존: 사용자 식별용
	session.Values["session_id"] = sessionID   // 신규: 로그아웃 시 사용할 login_history ID
	session.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   20 * 60, // 20분(초 단위)
		HttpOnly: true,
		SameSite: http.SameSiteStrictMode,
		Secure:   false, // HTTPS 환경에서는 true로 설정
	}

	// 세션 저장 (반드시 JSON 응답 전에!)
	if err := session.Save(r, w); err != nil {
		// 세션 저장 실패 시 로그아웃 처리 (정합성 유지)
		if sessionID > 0 {
			h.authService.Logout(sessionID) // 생성된 로그인 기록을 정리
		}
		http.Error(w, "세션 저장 실패", http.StatusInternalServerError)
		return
	}

	// 로그인 성공 응답
	data := new(response.LoginResponse)
	data.LoginResponseFromModel(*userAccount)
	resp := response.APIResponse{
		Success: true,
		Message: "로그인 성공",
		Data:    data,
	}

	util.RespondWithJSON(w, http.StatusOK, resp)
}

func (h *AuthHandler) LogoutHandler(w http.ResponseWriter, r *http.Request) {
	session, err := store.Get(r, "lms-session")
	if err != nil {
		http.Error(w, "세션 조회 실패", http.StatusInternalServerError)
		return
	}

	// 세션에서 sessionID 가져오기 (login_history의 id)
	sessionIDRaw, exists := session.Values["session_id"]
	if !exists {
		// 로그인 안 된 상태 -> 그냥 OK 응답
		http.Error(w, "종료된 세션입니다.", http.StatusUnauthorized)
		return
	}

	sessionID, ok := sessionIDRaw.(int64)
	if !ok {
		// int64로 변환 시도
		if sessionIDStr, isString := sessionIDRaw.(string); isString {
			if parsedID, parseErr := strconv.ParseInt(sessionIDStr, 10, 64); parseErr == nil {
				sessionID = parsedID
			} else {
				http.Error(w, "유효하지 않은 세션 ID입니다.", http.StatusUnauthorized)
				return
			}
		} else {
			http.Error(w, "유효하지 않은 세션 ID입니다.", http.StatusUnauthorized)
			return
		}
	}

	if sessionID <= 0 {
		http.Error(w, "유효하지 않은 세션 ID입니다.", http.StatusUnauthorized)
		return
	}

	// 서비스 로직: 로그아웃 시간 업데이트
	if err := h.authService.Logout(sessionID); err != nil {
		// 로그아웃 실패해도 세션은 삭제 (보안상 안전)
		log.Printf("로그아웃 처리 실패: %v", err)
	}

	// 세션 만료 처리
	session.Options.MaxAge = -1
	if err := session.Save(r, w); err != nil {
		log.Printf("세션 저장 실패: %v", err)
	}

	// 응답
	resp := response.APIResponse{
		Success: true,
		Message: "로그아웃 성공",
	}
	util.RespondWithJSON(w, http.StatusOK, resp)
}

func (h *AuthHandler) SessionHandler(w http.ResponseWriter, r *http.Request) {
	sessionName := "lms-session"

	// 세션 가져오기
	session, err := store.Get(r, sessionName)
	if err != nil || session == nil {
		http.Error(w, "세션이 존재하지 않습니다.", http.StatusUnauthorized)
		return
	}

	// 세션에서 사용자 ID 추출
	id, ok := session.Values["id"].(string)
	if !ok || id == "" {
		http.Error(w, "세션 ID가 유효하지 않습니다.", http.StatusUnauthorized)
		return
	}

	// 사용자 정보 조회
	userAccount, err := h.authService.GetUserInfo(id)
	if userAccount == nil || err != nil {
		http.Error(w, "사용자 정보를 찾을 수 없습니다.", http.StatusUnauthorized)
		return
	}

	// 응답 생성
	// resp := response.UserSessionResponse{
	// 	LastLoginDate: userAccount.RecentConnDate.String(),
	// 	// Permissions:   []string{"user"}, // 예시로 "user" 권한만 설정
	// }

	resp := response.NewResponse[any](true, "", nil)
	util.RespondWithJSON(w, http.StatusOK, resp)
}

func (h *AuthHandler) IdExistsHandler(w http.ResponseWriter, r *http.Request) {
	var req request.IdExistsRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "잘못된 요청입니다.", http.StatusBadRequest)
		return
	}

	exists, err := h.authService.IsIdExists(req.ID)
	if err != nil {
		log.Printf("ID 존재 여부 조회 실패: %v", err)
		http.Error(w, "서버 오류", http.StatusInternalServerError)
		return
	}

	util.RespondWithJSON(w, http.StatusOK, response.IdExistsResponse{Exists: exists})
}

// 사용자관리 핸들러
func (h *AuthHandler) UserRegisterHandler(w http.ResponseWriter, r *http.Request) {
	var userReq *request.UserRegisterRequest
	if err := json.NewDecoder(r.Body).Decode(userReq); err != nil {
		http.Error(w, "잘못된 요청입니다.", http.StatusBadRequest)
		return
	}

	err := h.authService.RegisterUser(userReq)
	if err != nil {
		log.Printf("사용자 등록 실패: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	util.RespondWithJSON(w, http.StatusOK, struct{}{})
}
