package model

import "time"

type UserAccount struct {
	LoginId          string
	Passwd           string
	EmpName          string
	DptName          string
	OfficeTel        string
	MobileTel        string
	RecentConnDate   *time.Time
	DeleteDate       *time.Time
	PasswdUpdateDate *time.Time
	PwFailCount      int
	ClientIp         string
	PwRef            string
	RegEmpId         string
	RegDate          *time.Time
	UpdEmpId         string
	UpdDate          *time.Time
	Permission       string
}
