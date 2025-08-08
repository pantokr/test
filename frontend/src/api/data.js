const AUTH_ROUTE = process.env.REACT_APP_AUTH_ROUTE;

export async function fetchLoginInfo() {
  try {
    const response = await fetch(`${AUTH_ROUTE}/login-info`);
    if (!response.ok) {
      throw new Error("데이터 불러오기 실패");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return []; // 에러 시 빈 배열 반환
  }
}

export async function fetchLoginFail() {
  try {
    const response = await fetch(`${AUTH_ROUTE}/login-fail`);
    if (!response.ok) {
      throw new Error("데이터 불러오기 실패");
    }
    const data = await response.json(); // 서버에서 오는 raw 배열 데이터
    return data;
  } catch (error) {
    console.error(error);
    return []; // 에러 시 빈 배열 반환
  }
}

export async function fetchLoginReset() {
  try {
    const response = await fetch(`${AUTH_ROUTE}/login-reset`);
    if (!response.ok) {
      throw new Error("데이터 불러오기 실패");
    }
    const data = await response.json(); // 서버에서 오는 raw 배열 데이터
    return data;
  } catch (error) {
    console.error(error);
    return []; // 에러 시 빈 배열 반환
  }
}
