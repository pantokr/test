// api/types/user.ts

/**
 * 사용자 기본 정보 (공통 필드)
 */
export interface UserBaseInfo {
  loginID: string;
  empName: string;
  dptName: string;
  officeTel: string;
  mobileTel: string;
}

/**
 * 사용자 수정 데이터
 */
export interface PasswdUpdate extends UserBaseInfo {
  oldPasswd: string;
  newPasswd: string;
}

/**
 * 사용자 수정 데이터
 */
export interface UserUpdate extends PasswdUpdate {
  updateEmpID: string;
}

/**
 * 사용자 등록 데이터
 */
export interface UserRegistration extends UserBaseInfo {
  regEmpID: string;
}
