package response

import (
	"lms/internal/model"
)

type LoginUserDataResponse struct {
	LoginId    string `json:"loginId"`
	EmpName    string `json:"empName"`
	DptName    string `json:"dptName"`
	OfficeTel  string `json:"officeTel"`
	MobileTel  string `json:"mobileTel"`
	Permission string `json:"permission"`
}

// NewLoginUserData model.UserAccount에서 안전한 데이터만 추출
func NewLoginUserData(userAccount *model.UserAccount) *LoginUserDataResponse {
	if userAccount == nil {
		return nil
	}

	return &LoginUserDataResponse{
		LoginId:    userAccount.LoginId,
		EmpName:    userAccount.EmpName,
		DptName:    userAccount.DptName,
		OfficeTel:  userAccount.OfficeTel,
		MobileTel:  userAccount.MobileTel,
		Permission: userAccount.Permission,
	}
}
