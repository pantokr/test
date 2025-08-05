package response

// LoginFail 구조체 정의
type LoginFailResponse struct {
	LoginID   string `json:"login_id"`
	LoginTime string `json:"login_time"`
	FailCode  string `json:"fail_code"`
	ClientIP  string `json:"client_ip"`
	ServerIP  string `json:"server_ip"`
}
