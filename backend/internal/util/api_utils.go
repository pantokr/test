package util

import (
	"encoding/json"
	"net/http"
)

func RespondError(w http.ResponseWriter, statusCode int, message string, detailCode string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	response := map[string]string{"error": message, "detail": detailCode}
	json.NewEncoder(w).Encode(response)
}

func RespondSuccess(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}
