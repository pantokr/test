// internal/handler/auth_handler.go
package handler

import (
	"encoding/json"
	"lms/internal/config"
	"lms/internal/handler/dto/request"
	"lms/internal/handler/dto/response"
	"lms/internal/service"
	"lms/internal/service/interfaces"
	"lms/internal/util"
	"log"
	"net/http"
)

type AuthHandler struct {
	authService    interfaces.AuthServiceInterface
	sessionService *service.SessionService // 구체 타입 사용
}

func InitAuthHandler(authService interfaces.AuthServiceInterface, sessionService *service.SessionService) *AuthHandler {
	return &AuthHandler{
		authService:    authService,
		sessionService: sessionService,
	}
}
func (h *AuthHandler) LoginHandler(w http.ResponseWriter, r *http.Request) {
	var creds request.Credentials
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		util.RespondError(w, http.StatusBadRequest, "잘못된 요청입니다.")
		return
	}

	clientIp := util.GetClientIp(r)
	serverIp := config.GetConfig().LocalIp

	loginReq := request.LoginRequest{
		Credentials: creds,
		ClientIp:    clientIp,
		ServerIp:    serverIp,
	}

	loginResp := h.authService.Login(loginReq)

	if loginResp == nil || !loginResp.Success {
		// 비밀번호 재설정 리다이렉트 시
		if loginResp.Code == "3" {
			util.RespondErrorWithCode(w, http.StatusUnauthorized, "비밀번호 재설정 필요", "PASSWORD_RESET_REQUIRED")
			return
		}
		log.Printf("로그인 실패: %v", loginResp.Message)
		util.RespondError(w, http.StatusUnauthorized, "로그인 실패: "+loginResp.Message)
		return
	}

	// SessionService를 통한 세션 생성
	if err := h.sessionService.CreateSession(w, r, loginResp.User.LoginId, loginResp.User.EmpName, loginResp.SessionId); err != nil {
		log.Printf("세션 저장 실패: %v", err)
		if loginResp.SessionId > 0 {
			h.authService.Logout(loginResp.SessionId)
		}
		util.RespondError(w, http.StatusInternalServerError, "세션 저장 실패")
		return
	}

	util.RespondSuccess(w, response.NewLoginUserData(loginResp.User))

}

func (h *AuthHandler) LogoutHandler(w http.ResponseWriter, r *http.Request) {
	// SessionService를 통한 세션 검증
	sessionInfo, err := h.sessionService.ValidateSession(r)
	if err != nil {
		log.Printf("로그아웃 세션 검증 실패: %v", err)
	}

	// 로그아웃 처리
	if sessionInfo == nil {
		log.Printf("로그아웃 세션 정보 없음")
	} else if err := h.authService.Logout(sessionInfo.SessionId); err != nil {
		log.Printf("로그아웃 처리 실패: %v", err)
	}

	// SessionService를 통한 세션 삭제
	if err := h.sessionService.DestroySession(w, r); err != nil {
		log.Printf("로그아웃 세션 삭제 실패: %v", err)
	}

	util.RespondSuccess(w, nil)
}

func (h *AuthHandler) SessionHandler(w http.ResponseWriter, r *http.Request) {
	// SessionService를 통한 세션 검증
	sessionInfo, err := h.sessionService.ValidateSession(r)
	if err != nil {
		util.RespondError(w, http.StatusUnauthorized, "세션 검증 실패")
		return
	}

	// 상세 사용자 정보 조회
	userAccount, err := h.authService.GetUserInfo(sessionInfo.UserId)
	if userAccount == nil || err != nil {
		util.RespondError(w, http.StatusNotFound, "사용자 정보 없음")
		return
	}

	// 세션 시간 연장
	if err := h.sessionService.ExtendSession(w, r); err != nil {
		log.Printf("세션 연장 실패: %v", err)
		// 연장 실패해도 응답은 계속 진행
	}

	util.RespondSuccess(w, response.NewLoginUserData(userAccount))
}
