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
    const errorMsg = await response.text();

    switch (response.status) {
      default:
        throw new Error(errorMsg);
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
  }

  return response.json();
}

// 새로고침 쿠키 재설정
export async function fetchUserSession() {
  const response = await fetch(`${AUTH_ROUTE}/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    const errorMsg = await response.text();

    switch (response.status) {
      default:
        throw new Error(errorMsg);
    }
  }

  return response.json();
}

export async function isExistUser(id) {
  const response = await fetch(`${AUTH_ROUTE}/id-exists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
    credentials: "include",
  });

  if (!response.ok) {
    const errorMsg = await response.text();
    switch (response.status) {
      case 404:
        return false; // 사용자 없음
      default:
        throw new Error(errorMsg);
    }
  }
  return true; // 사용자 존재
}

export async function registerUser(userData) {
  const response = await fetch(`${AUTH_ROUTE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
    credentials: "include",
  });

  if (!response.ok) {
    const errorMsg = await response.text();
    switch (response.status) {
      default:
        throw new Error(errorMsg);
    }
  }
  return response.json();
}
