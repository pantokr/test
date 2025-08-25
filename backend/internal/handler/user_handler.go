package handler

import (
	"encoding/json"
	"lms/internal/handler/dto/request"
	"lms/internal/service/interfaces"
	"lms/internal/util"
	"log"
	"net/http"
)

type UserHandler struct {
	userService interfaces.UserServiceInterface
}

// InitAuthHandler - AuthHandler 초기화
func InitUserHandler(userService interfaces.UserServiceInterface) *UserHandler {
	return &UserHandler{
		userService: userService,
	}
}

// 사용자관리 핸들러
func (h *UserHandler) UserRegistrationHandler(w http.ResponseWriter, r *http.Request) {
	var userRegReq request.UserRegistrationRequest
	if err := json.NewDecoder(r.Body).Decode(&userRegReq); err != nil {
		util.RespondError(w, http.StatusBadRequest, "잘못된 요청입니다.")
		return
	}

	err := h.userService.RegisterUser(userRegReq)
	if err != nil {
		log.Printf("사용자 등록 실패: %v", err)
		util.RespondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	log.Printf("사용자 등록 성공: %s", userRegReq.LoginID)
	util.RespondSuccess(w, nil)
}

func (h *UserHandler) UserUpdateHandler(w http.ResponseWriter, r *http.Request) {
	var userUpdReq request.UserUpdateRequest
	if err := json.NewDecoder(r.Body).Decode(&userUpdReq); err != nil {
		util.RespondError(w, http.StatusBadRequest, "잘못된 요청입니다.")
		return
	}

	err := h.userService.UpdateUser(userUpdReq)
	if err != nil {
		log.Printf("사용자 수정 실패: %v", err)
		util.RespondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	log.Printf("사용자 수정 성공: %s", userUpdReq.LoginID)
	util.RespondSuccess(w, nil)
}
