// api/types/user.ts

import { LoginCredentials, UserData } from "./auth";

/**
 * 비밀번호 수정 데이터
 */
export interface PasswdUpdate extends LoginCredentials {
  newPasswd: string;
}

/**
 * 사용자 수정 데이터
 */
export interface UserUpdate extends UserData {
  updateEmpID: string;
}

/**
 * 사용자 등록 데이터
 */
export interface UserRegistration extends UserData {
  regEmpID: string;
}
