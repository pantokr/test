package model

import "time"

type UserAccount struct {
	LoginID          string
	Passwd           string
	EmpName          string
	DeptName         string
	OfficeTel        string
	MobileTel        string
	RecentConnDate   *time.Time
	DeleteDate       *time.Time
	PasswdUpdateDate *time.Time
	PwFailCount      int
	ClientIP         string
	PwRef            string
	RegEmpID         string
	RegDate          *time.Time
	UpdEmpID         string
	UpdDate          *time.Time
}
