package request

type Credentials struct {
	ID     string `json:"id"`
	Passwd string `json:"passwd"`
}

type Login struct {
	Credentials
	ClientIP string
	ServerIP string
}
