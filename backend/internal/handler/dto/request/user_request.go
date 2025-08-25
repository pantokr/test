package request

// 사용자 기본 정보 (공통 필드)
type UserBaseInfo struct {
	LoginID   string `json:"loginID" `
	EmpName   string `json:"empName" `
	DptName   string `json:"dptName"`
	OfficeTel string `json:"officeTel"`
	MobileTel string `json:"mobileTel"`
}

type PasswordUpdateRequest struct {
	UserBaseInfo
	OldPasswd string `json:"oldPasswd"`
	NewPasswd string `json:"newPasswd"`
}

type UserRegistrationRequest struct {
	UserBaseInfo        // 기본 정보 임베딩
	RegEmpID     string `json:"regEmpID"`
}

// 사용자 수정 요청 (multiple embedding)
type UserUpdateRequest struct {
	PasswordUpdateRequest        // 비밀번호 정보 임베딩
	UpdateEmpID           string `json:"updateEmpID"`
}
