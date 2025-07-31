package auth

import (
	"backend/repository"
	"encoding/json"
	"log"
	"net/http"
)

type LogoutResponse struct {
	ID string `json:"id"`
}

func LogoutHandler(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "session-id")

	// 세션에 "id" 값이 있는지 확인
	idRaw, exists := session.Values["id"]
	if !exists {
		http.Error(w, "Unauthorized: no session id", http.StatusUnauthorized)
		return
	}

	id, ok := idRaw.(string)
	if !ok || id == "" {
		http.Error(w, "Unauthorized: invalid session id", http.StatusUnauthorized)
		return
	}

	// 로그아웃 시간 업데이트
	repository.UpdateLogoutTime(id)
	log.Printf("로그아웃 시도: ID=%s", id)

	// 세션 만료 처리
	session.Options.MaxAge = -1
	if err := session.Save(r, w); err != nil {
		log.Printf("세션 저장 실패: %v", err)
	}

	// 응답 설정
	w.WriteHeader(http.StatusOK)
	resp := LogoutResponse{
		ID: id,
	}
	json.NewEncoder(w).Encode(resp)
}
