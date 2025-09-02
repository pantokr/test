package request

type LoginRequest struct {
	Credentials
	ClientIp string `json:"clientIp"`
	ServerIp string `json:"serverIp"`
}
