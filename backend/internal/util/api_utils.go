package util

import (
	"encoding/json"
	"net/http"
)

func RespondError(w http.ResponseWriter, statusCode int, message string) {
	response := map[string]any{
		"success":   false,
		"errorCode": statusCode,
		"message":   message,
	}
	RespondJSON(w, statusCode, response)
}

func RespondSuccess(w http.ResponseWriter, data any) {
	response := map[string]any{
		"success": true,
		"data":    data,
	}
	RespondJSON(w, http.StatusOK, response)
}

func RespondJSON(w http.ResponseWriter, statusCode int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(data)
}
