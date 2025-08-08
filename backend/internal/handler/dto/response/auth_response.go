package response

import (
	"lms/internal/model"
	"lms/internal/util"
)

type LoginResponse struct {
	LoginID   string `json:"loginID"`
	EmpName   string `json:"emp_name"`
	DeptName  string `json:"dept_name"`
	OfficeTel string `json:"office_tel"`
	MobileTel string `json:"mobile_tel"`
}

func (r *LoginResponse) LoginResponseFromModel(userAccount model.UserAccount) {
	r.LoginID = util.SafeString(userAccount.LoginID)
	r.EmpName = util.SafeString(userAccount.EmpName)
	r.DeptName = util.SafeString(userAccount.DeptName)
	r.OfficeTel = util.SafeString(userAccount.OfficeTel)
	r.MobileTel = util.SafeString(userAccount.MobileTel)
}

// type UserSessionResponse struct {
// 	LoginResponse
// 	LastLoginDate string `json:"lastLoginDate"`
// 	// Permissions   []string `json:"permissions"`
// }

type IdExistsResponse struct {
	Exists bool `json:"exists"`
}
