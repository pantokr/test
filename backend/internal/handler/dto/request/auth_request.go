package request

type LoginRequest struct {
	Credentials
	ClientIP string
	ServerIP string
}

type UserRegisterRequest struct {
	LoginID   *string
	Passwd    *string
	EmpName   *string
	DeptName  *string
	OfficeTel *string
	MobileTel *string
}

type IdExistsRequest struct {
	ID string `json:"id"`
}
