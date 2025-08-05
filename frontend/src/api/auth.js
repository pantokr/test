// src/api/auth.js
const AUTH_ROUTE = process.env.REACT_APP_AUTH_ROUTE;

export async function login({ id, passwd }) {
  const response = await fetch(`${AUTH_ROUTE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, passwd }),
    credentials: "include",
  });

  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error("잘못된 요청입니다.");
      case 401:
        throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
      case 500:
        throw new Error("서버 내부 오류가 발생했습니다.");
      default:
        throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  }
  return response.json();
}

export async function logout() {
  const response = await fetch(`${AUTH_ROUTE}/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error("잘못된 요청입니다.");
      case 401:
        throw new Error("종료된 로그인 세션입니다.");
      case 500:
        throw new Error("서버 내부 오류가 발생했습니다.");
      default:
        throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  }

  return response.json();
}

// 새로고침 쿠키 재설정
export async function fetchUserSession() {
  const response = await fetch(`${AUTH_ROUTE}/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    switch (response.status) {
      default:
        throw new Error("세션: 알 수 없는 오류가 발생했습니다.");
    }
  }

  return response.json();
}
