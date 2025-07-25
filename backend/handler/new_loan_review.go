package handler

import (
	"encoding/json"
	"net/http"

	"backend/repository"
)

// /loans 핸들러
func NewLoanReviewHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		loans, err := repository.GetLoans()
		if err != nil {
			http.Error(w, "DB 조회 실패", http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(loans)

	default:
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
	}
}
