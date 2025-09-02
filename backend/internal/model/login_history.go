package model

import "time"

type LoginHistory struct {
	LoginId    string
	EmpName    string
	LoginTime  *time.Time
	LogoutTime *time.Time
	IsExternal string
	ClientIp   string
	ServerIp   string
}
