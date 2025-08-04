package logs

import (
	"encoding/json"
	"log"
	"net/http"

	"backend/repository"
)

func LoginFailHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	loginInfos, err := repository.SelectLoginFailAll()
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
