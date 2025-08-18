package model

import "time"

type LoginResetHistory struct {
	LoginID     string     `json:"login_id"`
	ResetTime   *time.Time `json:"reset_time"`
	ResetCode   string     `json:"reset_code"`
	ResetID     string     `json:"reset_id"`
	ResetReason string     `json:"reset_reason"`
	PrevLoginIP string     `json:"prev_login_ip"`
}
