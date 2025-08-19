package request

type LoginRequest struct {
	Credentials
	ClientIP string
	ServerIP string
}

type UserRegisterRequest struct {
	LoginID   string
	Passwd    string
	EmpName   string
	DptName   string
	OfficeTel string
	MobileTel string
	RegEmpID  string
}

type IdExistsRequest struct {
	ID string `json:"id"`
}
