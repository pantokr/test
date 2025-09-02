package response

// LoginHistoryItem과 대응되는 Go struct
type LoginHistoryItem struct {
	LoginId    string `json:"loginId"`    // 사용자 ID
	EmpName    string `json:"empName"`    // 이름
	LoginTime  string `json:"loginTime"`  // 로그인 시간 (datetime)
	LogoutTime string `json:"logoutTime"` // 로그아웃 시간 (nullable)
	IsExternal string `json:"isExternal"` // 외부 접속 여부 ('Y' | 'N' | null)
	ClientIp   string `json:"clientIp"`   // 사용자 IP
	ServerIp   string `json:"serverIp"`   // 서버 IP
}

type LoginFailureHistoryResponse struct {
	LoginId   string `json:"loginId"`
	LoginTime string `json:"loginTime"`
	FailCode  string `json:"failCode"`
	ClientIp  string `json:"clientIp"`
	ServerIp  string `json:"serverIp"`
}

type LoginResetResponse struct {
	ResetTime   string `json:"resetTime"`
	ResetCode   string `json:"resetCode"`
	LoginId     string `json:"loginId"`
	ResetId     string `json:"resetId"`
	ResetReason string `json:"resetReason"`
	PrevLoginIp string `json:"prevLoginIp"`
}
