package model

import "time"

type LoginHistory struct {
	LoginID    *string    `json:"login_id"`
	EmpName    *string    `json:"emp_name"`
	LoginTime  *time.Time `json:"login_time"`
	LogoutTime *time.Time `json:"logout_time"`
	IsExternal *string    `json:"is_external"`
	ClientIP   *string    `json:"client_ip"`
	ServerIP   *string    `json:"server_ip"`
}
