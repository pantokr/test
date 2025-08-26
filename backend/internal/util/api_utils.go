package util

import (
	"encoding/json"
	"net/http"
)

type APIResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message,omitempty"`
	Data    any    `json:"data,omitempty"`
	Code    string `json:"code,omitempty"`
}

func RespondSuccess(w http.ResponseWriter, data any) {
	response := APIResponse{
		Success: true,
		Data:    data,
	}
	RespondJSON(w, http.StatusOK, response)
}

func RespondError(w http.ResponseWriter, statusCode int, message string) {
	response := APIResponse{
		Success: false,
		Message: message,
	}
	RespondJSON(w, statusCode, response)
}

func RespondErrorWithCode(w http.ResponseWriter, statusCode int, message, code string) {
	response := APIResponse{
		Success: false,
		Message: message,
		Code:    code,
	}
	RespondJSON(w, statusCode, response)
}

func RespondJSON(w http.ResponseWriter, statusCode int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(data)
}
