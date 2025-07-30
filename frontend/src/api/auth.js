// src/api/auth.js
const LOGIN_ROUTE = process.env.REACT_APP_LOGIN_ROUTE;
const LOGOUT_ROUTE = process.env.REACT_APP_LOGOUT_ROUTE;

export async function login({ id, passwd }) {
  const response = await fetch(`${LOGIN_ROUTE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, passwd }),
    credentials: "include",
  });

  if (!response.ok) {
    try {
      const data = await response.json(); // 서버에서 내려준 JSON 메시지
    } catch (_) {
      // JSON 파싱 실패하면 무시
    }
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
  const response = await fetch(`${LOGOUT_ROUTE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) {
    let message = "로그아웃 실패"; // 기본 메시지
    try {
      const data = await response.json();
    } catch (_) {
      // JSON 파싱 실패 시 무시
    }

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

export async function resetpasswd(email) {
  return await fetch("/api/reset-passwd", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}
