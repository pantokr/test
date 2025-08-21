package request

type UserRegistrationRequest struct {
	LoginID   string `json:"loginID"`
	Passwd    string `json:"passwd"`
	EmpName   string `json:"empName"`
	DptName   string `json:"dptName"`
	OfficeTel string `json:"officeTel"`
	MobileTel string `json:"mobileTel"`
	Email     string `json:"email"`
	RegEmpID  string `json:"regEmpID"`
}
