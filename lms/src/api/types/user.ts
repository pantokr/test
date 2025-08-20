/**
 * 사용자 등록 데이터
 */
export interface UserRegistration {
  loginID: string;
  passwd: string;
  empName: string;
  deptName: string;
  officeTel?: string;
  mobileTel?: string;
  email?: string;
}
