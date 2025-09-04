// src/types/index.ts에 추가할 타입들

// 로그인 히스토리 아이템 (실제 DB 테이블 구조에 맞춤)
export interface LoginHistoryItem {
  login_id: string; // 사용자 ID
  emp_name: string; // 이름
  login_time: string; // 로그인 시간 (datetime)
  logout_time: string | null; // 로그아웃 시간 (datetime, nullable)
  is_external: string | null; // 외부 접속 여부 ('Y' | 'N' | null)
  client_ip: string | null; // 사용자 IP
  server_ip: string | null; // 서버 IP
}

export interface LoginFailureHistoryItem {
  login_id: string;
  login_time: string;
  fail_code: string;
  client_ip: string;
  server_ip: string;
}

export interface LoginResetHistoryItem {
  reset_code: string;
  reset_time: string;
  login_id: string;
  reset_id: string;
  reset_reason: string;
  prev_login_ip: string;
}
