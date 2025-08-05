package handler

import (
	"encoding/json"
	"lms/internal/config"
	"lms/internal/model/request"
	"lms/internal/model/response"
	"lms/internal/service"
	"lms/internal/util"
	"log"
	"net/http"

	"github.com/gorilla/sessions"
)

type AuthHandler struct {
	authService *service.AuthService
}

func InitAuthHandler(authService *service.AuthService) *AuthHandler {
	return &AuthHandler{authService: authService}
}

var store = sessions.NewCookieStore([]byte("secret-key"))

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

	// 로그인 시도
	userAccount, err := h.authService.Login(loginReq)
	if err != nil {
		log.Printf("로그인 실패: %v", err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	// 세션 생성
	session, _ := store.Get(r, "lms-session")
	session.Values["id"] = *userAccount.ID

	session.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   20 * 60, // 20분(초 단위)
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		Secure:   true, // HTTPS 환경에서는 true로 설정
	}
	session.Save(r, w)

	// 로그인 성공 응답
	resp := new(response.LoginResponse)
	resp.FromModel(*userAccount)
	util.RespondWithJSON(w, http.StatusOK, resp)
}

func (h *AuthHandler) LogoutHandler(w http.ResponseWriter, r *http.Request) {
	session, err := store.Get(r, "lms-session")
	if err != nil {
		http.Error(w, "세션 조회 실패", http.StatusInternalServerError)
		return
	}

	idRaw, exists := session.Values["id"]
	if !exists {
		// 로그인 안 된 상태 -> 그냥 OK 응답
		http.Error(w, "종료된 세션입니다.", http.StatusUnauthorized)
		return
	}

	id, ok := idRaw.(string)
	if !ok || id == "" {
		http.Error(w, "유효하지 않은 세션 ID입니다.", http.StatusUnauthorized)
		return
	}

	// 서비스 로직: 로그아웃 시간 업데이트
	if err := h.authService.Logout(id); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// 세션 만료 처리
	session.Options.MaxAge = -1
	if err := session.Save(r, w); err != nil {
		log.Printf("세션 저장 실패: %v", err)
	}

	resp := response.LogoutResponse{
		ID: id,
	}
	// 응답
	util.RespondWithJSON(w, http.StatusOK, resp)
}

func (h *AuthHandler) LoginInfoHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	loginInfos, err := h.authService.GetLoginInfoAll()
	if err != nil {
		log.Printf("로그인 정보 조회 실패: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	util.RespondWithJSON(w, http.StatusOK, loginInfos)
}

func (h *AuthHandler) LoginFailHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	loginFails, err := h.authService.GetLoginFailAll()
	if err != nil {
		util.RespondWithJSON(w, http.StatusInternalServerError, err.Error())
		return
	}

	// 성공 시 200과 JSON 반환
	util.RespondWithJSON(w, http.StatusOK, loginFails)
}

func (h *AuthHandler) LoginResetHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	loginResets, err := h.authService.GetLoginResetAll()
	if err != nil {
		util.RespondWithJSON(w, http.StatusInternalServerError, err.Error())
		return
	}

	// 성공 시 200과 JSON 반환
	util.RespondWithJSON(w, http.StatusOK, loginResets)
}

func (h *AuthHandler) MeHandler(w http.ResponseWriter, r *http.Request) {
	session, err := store.Get(r, "lms-session")
	if err != nil {
		return
	}

	idRaw, exists := session.Values["id"]
	if !exists {
		return
	}

	id, ok := idRaw.(string)
	if !ok || id == "" {
		return
	}

	userAccount, err := h.authService.GetUserInfo(id)
	if err != nil {
		return
	}

	resp := response.LoginResponse{}
	resp.FromModel(*userAccount)

	util.RespondWithJSON(w, http.StatusOK, resp)
}
