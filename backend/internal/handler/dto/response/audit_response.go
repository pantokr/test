package response

// LoginHistoryItem과 대응되는 Go struct
type LoginHistoryItem struct {
	LoginID    string `json:"login_id"`    // 사용자 ID
	EmpName    string `json:"emp_name"`    // 이름
	LoginTime  string `json:"login_time"`  // 로그인 시간 (datetime)
	LogoutTime string `json:"logout_time"` // 로그아웃 시간 (nullable)
	IsExternal string `json:"is_external"` // 외부 접속 여부 ('Y' | 'N' | null)
	ClientIP   string `json:"client_ip"`   // 사용자 IP
	ServerIP   string `json:"server_ip"`   // 서버 IP
}

type LoginFailureHistoryResponse struct {
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
