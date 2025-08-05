package response

import (
	"lms/internal/model"
	"lms/internal/util"
)

type LoginResponse struct {
	ID        string `json:"id"`
	EmpName   string `json:"emp_name"`
	DeptName  string `json:"dept_name"`
	OfficeTel string `json:"office_tel"`
	MobileTel string `json:"mobile_tel"`
}

func (r *LoginResponse) FromModel(userAccount model.UserAccount) {
	r.ID = util.SafeString(userAccount.ID)
	r.EmpName = util.SafeString(userAccount.EmpName)
	r.DeptName = util.SafeString(userAccount.DeptName)
	r.OfficeTel = util.SafeString(userAccount.OfficeTel)
	r.MobileTel = util.SafeString(userAccount.MobileTel)
}
