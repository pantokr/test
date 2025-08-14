package handler

import (
	"lms/internal/handler/dto/response"
	serviceInterfaces "lms/internal/service/interfaces"

	"lms/internal/util"
	"log"
	"net/http"
)

type AuditHandler struct {
	auditService serviceInterfaces.AuditServiceInterface
}

func InitAuditHandler(auditService serviceInterfaces.AuditServiceInterface) *AuditHandler {
	return &AuditHandler{auditService: auditService}
}

func (h *AuditHandler) LoginHistoryHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	histories, err := h.auditService.GetLoginHistoryAll()
	if err != nil {
		log.Printf("로그인 기록 조회 실패: %v", err)
		http.Error(w, "로그인 기록 조회 실패", http.StatusInternalServerError)
		return
	}
	if histories == nil {
		util.RespondWithJSON(w, http.StatusOK, response.NewResponse[interface{}](true, "로그인 기록이 없습니다.", nil))
		return
	}

	util.RespondWithJSON(w, http.StatusOK, response.NewResponse(true, "로그인 기록 조회 성공", &histories))
}

func (h *AuditHandler) LoginFailureHistoryHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	loginFails, err := h.auditService.GetLoginFailureHistoryAll()
	if err != nil {
		util.RespondWithJSON(w, http.StatusInternalServerError, err.Error())
		return
	}

	// 성공 시 200과 JSON 반환
	util.RespondWithJSON(w, http.StatusOK, loginFails)
}

func (h *AuditHandler) LoginResetHistoryHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	loginResets, err := h.auditService.GetLoginResetHistoryAll()
	if err != nil {
		util.RespondWithJSON(w, http.StatusInternalServerError, err.Error())
		return
	}

	// 성공 시 200과 JSON 반환
	util.RespondWithJSON(w, http.StatusOK, loginResets)
}
