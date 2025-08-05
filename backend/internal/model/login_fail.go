package model

import "time"

// LoginFail 구조체 정의
type LoginFail struct {
	LoginID   *string    `json:"login_id"`
	LoginTime *time.Time `json:"login_time"`
	FailCode  *string    `json:"fail_code"`
	ClientIP  *string    `json:"client_ip"`
	ServerIP  *string    `json:"server_ip"`
}
