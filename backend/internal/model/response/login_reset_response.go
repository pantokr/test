package response

type LoginResetResponse struct {
	ResetTime   string `json:"reset_time"`
	ResetCode   string `json:"reset_code"`
	LoginID     string `json:"login_id"`
	ResetID     string `json:"reset_id"`
	ResetReason string `json:"reset_reason"`
	PrevLoginIP string `json:"prev_login_ip"`
}
