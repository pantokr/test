package auth

import (
	"backend/repository"
	"encoding/json"
	"log"
	"net/http"
)

func MeHandler(w http.ResponseWriter, r *http.Request) {

	session, err := store.Get(r, "session-id")
	if err != nil {
		return
	}
	idRaw, exists := session.Values["id"]
	if !exists {
		return
	}

	id, ok := idRaw.(string)
	if !ok {
		return
	}
	if id == "" {
		log.Println("세션 id가 빈 문자열임")
		return
	}

	user, err := repository.GetUserByID(id)
	if err != nil {
		if err == repository.ErrUserNotFound {
			log.Printf("DB 조회 실패: 사용자 없음 (id=%s)", id)
			http.Error(w, "Unauthorized: user not found", http.StatusUnauthorized)
			return
		}
		log.Printf("DB 오류: %v", err)
		http.Error(w, "서버 오류", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	resp := LoginResponse{
		ID:        user.ID,
		EmpName:   user.EmpName,
		DeptName:  user.DeptName,
		OfficeTel: user.OfficeTel,
		MobileTel: user.MobileTel,
	}
	json.NewEncoder(w).Encode(resp)
}
