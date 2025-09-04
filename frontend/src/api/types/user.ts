// api/types/user.ts

import { LoginCredentials } from "./auth";

/**
 * 사용자 기본 정보
 */
export interface UserData {
  loginId: string;
  empName: string;
  officeTel: string;
  mobileTel: string;
  dptName: string;
  permission: string;
}

/**
 * 비밀번호 수정 데이터
 */
export interface PasswdUpdate extends LoginCredentials {
  newPasswd: string;
}

/**
 * 비밀번호 초기화 데이터
 */
export interface PasswdReset {
  loginId: string;
  resetEmpId: string;
  resetCode: string;
  resetReason: string;
}

/**
 * 사용자 등록 데이터
 */
export interface UserRegistration extends UserData {
  regEmpId: string;
}

/**
 * 사용자 수정 데이터
 */
export interface UserUpdate extends UserData {
  updateEmpId: string;
}

/**
 * 사용자 삭제 데이터
 */
export interface UserDeletion {
  deleteEmpId: string;
}

export interface UserListItem {
  loginId: string; // login_Id - 사용자 Id
  passwd?: string; // passwd - 비밀번호
  empName?: string; // emp_name - 이름
  dptName?: string; // dpt_name - 부서명
  officeTel?: string; // office_tel - 사무실 전화번호
  mobileTel?: string; // mobile_tel - 핸드폰 번호
  recentConnDate?: string; // recent_conn_date - 최근접속일
  deleteDate?: string; // delete_date - 삭제일
  passwdUpdateDate?: string; // passwd_update_date - 비밀번호갱신일
  pwFailCount?: number; // pw_fail_count - 비밀번호 5회 오류
  clientIp?: string; // client_ip - 클라이언트 IP
  pwRef?: string; // pw_ref - 비밀번호 참조
  regEmpId?: string; // reg_emp_Id - 등록자 Id
  regDate?: string; // reg_date - 등록일
  updEmpId?: string; // upd_emp_Id - 수정자 Id
  updDate?: string; // upd_date - 수정일
}
