package handler

import (
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

	loginInfos, err := h.auditService.GetLoginHistoryAll()
	if err != nil {
		log.Printf("로그인 정보 조회 실패: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	util.RespondWithJSON(w, http.StatusOK, loginInfos)
}

func (h *AuditHandler) LoginFailureHistoryHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	loginFails, err := h.auditService.GetLoginFailHistoryAll()
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
