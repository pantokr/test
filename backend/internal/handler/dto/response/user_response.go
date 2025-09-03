package response

import (
	"lms/internal/model"
	"lms/internal/util"
)

type UserListResponse struct {
	LoginId          string `json:"loginId"`
	EmpName          string `json:"empName"`
	DptName          string `json:"dptName"`
	OfficeTel        string `json:"officeTel"`
	MobileTel        string `json:"mobileTel"`
	RecentConnDate   string `json:"recentConnDate"`
	PasswdUpdateDate string `json:"passwdUpdateDate"`
	ClientIp         string `json:"clientIp"`
	RegEmpId         string `json:"regEmpId"`
	RegDate          string `json:"regDate"`
	UpdEmpId         string `json:"updEmpId"`
	UpdDate          string `json:"updDate"`
	Permission       string `json:"permission"`
}

// NewUserData model.UserAccount에서 안전한 데이터만 추출
func NewUserList(userAccount *model.UserAccount) *UserListResponse {
	if userAccount == nil {
		return nil
	}

	return &UserListResponse{
		LoginId:          userAccount.LoginId,
		EmpName:          userAccount.EmpName,
		DptName:          userAccount.DptName,
		OfficeTel:        userAccount.OfficeTel,
		MobileTel:        userAccount.MobileTel,
		RecentConnDate:   util.FormatDate(userAccount.RecentConnDate),
		PasswdUpdateDate: util.FormatDate(userAccount.PasswdUpdateDate),
		ClientIp:         userAccount.ClientIp,
		RegEmpId:         userAccount.RegEmpId,
		RegDate:          util.FormatDate(userAccount.RegDate),
		UpdEmpId:         userAccount.UpdEmpId,
		UpdDate:          util.FormatDate(userAccount.UpdDate),
		Permission:       userAccount.Permission,
	}
}

// 여러 개 UserAccount → UserListResponse 슬라이스 변환
func NewUserListAll(userAccounts []*model.UserAccount) []*UserListResponse {
	var list []*UserListResponse
	for _, ua := range userAccounts {
		list = append(list, NewUserList(ua))
	}
	return list
}
