package model

import "time"

type LoginResetHistory struct {
	LoginId     string
	ResetTime   *time.Time
	ResetCode   string
	ResetId     string
	ResetReason string
	PrevLoginIp string
}
