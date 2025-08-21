package request

type LoginRequest struct {
	Credentials
	ClientIP string
	ServerIP string
}
