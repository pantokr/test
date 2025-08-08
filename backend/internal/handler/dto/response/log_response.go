package response

import (
	"lms/internal/model"
	"lms/internal/util"
)

type LoginHistoryResponse struct {
	LoginID    string `json:"login_id"`
	EmpName    string `json:"emp_name"`
	LoginTime  string `json:"login_time"`
	LogoutTime string `json:"logout_time"`
	IsExternal string `json:"is_external"`
	ClientIP   string `json:"client_ip"`
	ServerIP   string `json:"server_ip"`
}

func (r *LoginHistoryResponse) LoginHistoryResponseFromModel(login model.LoginHistory) {
	r.LoginID = util.SafeString(login.LoginID)
	r.EmpName = util.SafeString(login.EmpName)
	r.LoginTime = login.LoginTime.Format("2006-01-02 15:04:05")
	r.LogoutTime = login.LogoutTime.Format("2006-01-02 15:04:05")
	r.IsExternal = util.SafeString(login.IsExternal)
	r.ClientIP = util.SafeString(login.ClientIP)
	r.ServerIP = util.SafeString(login.ServerIP)
}

type LoginFailResponse struct {
	LoginID   string `json:"login_id"`
	LoginTime string `json:"login_time"`
	FailCode  string `json:"fail_code"`
	ClientIP  string `json:"client_ip"`
	ServerIP  string `json:"server_ip"`
}

type LoginResetResponse struct {
	ResetTime   string `json:"reset_time"`
	ResetCode   string `json:"reset_code"`
	LoginID     string `json:"login_id"`
	ResetID     string `json:"reset_id"`
	ResetReason string `json:"reset_reason"`
	PrevLoginIP string `json:"prev_login_ip"`
}
