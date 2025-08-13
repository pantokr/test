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

// 로그인 히스토리 응답
export interface LoginHistoryResponse {
  items: LoginHistoryItem[];
}
