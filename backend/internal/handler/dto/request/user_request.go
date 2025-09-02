package request

// 사용자 기본 정보 (공통 필드)
type UserBaseInfo struct {
	LoginId   string `json:"loginId" `
	EmpName   string `json:"empName" `
	DptName   string `json:"dptName"`
	OfficeTel string `json:"officeTel"`
	MobileTel string `json:"mobileTel"`
}

type PasswordUpdateRequest struct {
	Credentials
	NewPasswd string `json:"newPasswd"`
}

type UserRegistrationRequest struct {
	UserBaseInfo        // 기본 정보 임베딩
	RegEmpId     string `json:"regEmpId"`
}

type UserUpdateRequest struct {
	UserBaseInfo        // 비밀번호 정보 임베딩
	UpdateEmpId  string `json:"updateEmpId"`
}

type UserDeleteRequest struct {
	DeleteEmpId []string `json:"deleteEmpId"`
}
