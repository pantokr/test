package model

import "time"

// LoginFail 구조체 정의
type LoginFailureHistory struct {
	Id        int64
	LoginId   string
	LoginTime *time.Time
	FailCode  string
	ClientIp  string
	ServerIp  string
}
