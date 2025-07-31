const ROUTE = process.env.REACT_APP_ROUTE;

export async function fetchLoginInfo() {
  try {
    const response = await fetch(`${ROUTE}/login-info`);
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
