package response

import (
	"lms/internal/model"
)

// LoginResponse 통일된 로그인 응답 구조체
// type LoginResponse struct {
// 	Success  bool           `json:"success"`
// 	UserData *LoginUserData `json:"userData,omitempty"`
// 	Code     string         `json:"code,omitempty"`
// 	Message  string         `json:"message"`
// }

type LoginUserData struct {
	LoginID   string `json:"loginID"`
	EmpName   string `json:"empName"`
	DptName   string `json:"dptName"`
	MobileTel string `json:"mobileTel"`
	OfficeTel string `json:"officeTel"`
}

// NewLoginUserData model.UserAccount에서 안전한 데이터만 추출
func NewLoginUserData(userAccount *model.UserAccount) *LoginUserData {
	if userAccount == nil {
		return nil
	}

	return &LoginUserData{
		LoginID:   userAccount.LoginID,
		EmpName:   userAccount.EmpName,
		DptName:   userAccount.DptName,
		MobileTel: userAccount.MobileTel,
		OfficeTel: userAccount.OfficeTel,
	}
}

// // NewLoginResponse LoginResult를 API 응답으로 변환
// func NewLoginResponse(loginResult *types.LoginResult) *LoginResponse {

// 	response := &LoginResponse{
// 		Success: loginResult.Success,
// 		Code:    loginResult.Code,
// 		Message: loginResult.Message,
// 	}

// 	// 성공한 경우에만 사용자 데이터 포함
// 	if loginResult.Success && loginResult.User != nil {
// 		response.UserData = NewLoginUserData(loginResult.User)
// 	}

// 	return response
// }
