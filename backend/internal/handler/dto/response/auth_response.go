package response

import (
	"lms/internal/model"
)

type LoginResponse struct {
	LoginID   string `json:"loginID"`
	EmpName   string `json:"empName"`
	DptName   string `json:"dptName"`
	OfficeTel string `json:"officeTel"`
	MobileTel string `json:"mobileTel"`
}

func (r *LoginResponse) LoginResponseFromModel(userAccount model.UserAccount) {
	r.LoginID = userAccount.LoginID
	r.EmpName = userAccount.EmpName
	r.DptName = userAccount.DptName
	r.OfficeTel = userAccount.OfficeTel
	r.MobileTel = userAccount.MobileTel
}

// type UserSessionResponse struct {
// 	LoginResponse
// 	LastLoginDate string `json:"lastLoginDate"`
// 	// Permissions   []string `json:"permissions"`
// }
