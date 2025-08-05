package response

type LoginInfoResponse struct {
	LoginID    string `json:"login_id"`
	EmpName    string `json:"emp_name"`
	LoginTime  string `json:"login_time"`
	LogoutTime string `json:"logout_time"`
	IsExternal string `json:"is_external"`
	ClientIP   string `json:"client_ip"`
	ServerIP   string `json:"server_ip"`
}
