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

	histories, err := h.auditService.GetLoginHistoryAll()
	if err != nil {
		log.Printf("로그인 기록 조회 실패: %v", err)
		util.RespondError(w, http.StatusInternalServerError, "로그인 기록 조회 실패", "")
		return
	}
	if histories == nil {
		util.RespondSuccess(w, http.StatusOK, nil)
		return
	}

	util.RespondSuccess(w, http.StatusOK, &histories)
}

func (h *AuditHandler) LoginFailureHistoryHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	loginFails, err := h.auditService.GetLoginFailureHistoryAll()
	if err != nil {
		log.Printf("로그인 실패 기록 조회 실패: %v", err)
		util.RespondError(w, http.StatusInternalServerError, "로그인 실패 기록 조회 실패", "")
		return
	}

	// 성공 시 200과 JSON 반환
	util.RespondSuccess(w, http.StatusOK, &loginFails)
}

func (h *AuditHandler) LoginResetHistoryHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	loginResets, err := h.auditService.GetLoginResetHistoryAll()
	if err != nil {
		log.Printf("로그인 초기화 기록 조회 실패: %v", err)
		util.RespondError(w, http.StatusInternalServerError, "로그인 초기화 기록 조회 실패", "")
		return
	}

	// 성공 시 200과 JSON 반환
	util.RespondSuccess(w, http.StatusOK, &loginResets)
}
