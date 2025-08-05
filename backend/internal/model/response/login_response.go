package response

type LoginResponse struct {
	ID        string `json:"id"`
	EmpName   string `json:"emp_name"`
	DeptName  string `json:"dept_name"`
	OfficeTel string `json:"office_tel"`
	MobileTel string `json:"mobile_tel"`
}
