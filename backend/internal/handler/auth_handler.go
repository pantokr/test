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

	loginReq := request.Login{
		Credentials: creds,
		ClientIP:    clientIP,
		ServerIP:    serverIP,
	}

	// 로그인 시도
	userAccount, err := h.authService.Login(loginReq)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	session, _ := store.Get(r, "lms-session")
	session.Values["id"] = *userAccount.ID
	session.Save(r, w)

	// 로그인 성공 응답
	resp := response.LoginResponse{
		ID:        *userAccount.ID,
		EmpName:   *userAccount.EmpName,
		DeptName:  *userAccount.DeptName,
		OfficeTel: *userAccount.OfficeTel,
		MobileTel: *userAccount.MobileTel,
	}
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
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(struct{}{})
		return
	}

	id, ok := idRaw.(string)
	if !ok || id == "" {
		http.Error(w, "유효하지 않은 세션 id", http.StatusUnauthorized)
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

	// 응답
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"id": id})
}

func (h *AuthHandler) LoginInfoHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	loginInfos, err := h.authService.GetLoginInfoAll()
	if err != nil {
		log.Printf("로그인 정보 조회 실패: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// 성공 시 200과 JSON 반환
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(loginInfos); err != nil {
		log.Printf("JSON 인코딩 실패: %v", err)
	}
}

func (h *AuthHandler) LoginFailHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	loginInfos, err := h.authService.GetLoginFailAll()
	if err != nil {
		log.Printf("로그인 실패 조회 실패: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "로그인 실패 조회에 실패했습니다."})
		return
	}

	// 성공 시 200과 JSON 반환
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(loginInfos); err != nil {
		log.Printf("JSON 인코딩 실패: %v", err)
	}
}

func (h *AuthHandler) LoginResetHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	loginInfos, err := h.authService.GetLoginResetAll()
	if err != nil {
		log.Printf("로그인 초기화 조회 실패: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "로그인 초기화 조회에 실패했습니다."})
		return
	}

	// 성공 시 200과 JSON 반환
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(loginInfos); err != nil {
		log.Printf("JSON 인코딩 실패: %v", err)
	}
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

	resp := response.LoginResponse{
		ID:        util.SafeString(userAccount.ID),
		EmpName:   util.SafeString(userAccount.EmpName),
		DeptName:  util.SafeString(userAccount.DeptName),
		OfficeTel: util.SafeString(userAccount.OfficeTel),
		MobileTel: util.SafeString(userAccount.MobileTel),
	}

	util.RespondWithJSON(w, http.StatusOK, resp)
}
