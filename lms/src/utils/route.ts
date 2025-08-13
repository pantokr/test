// src/utils/route.ts

/**
 * 공개 라우트 목록 (인증이 필요하지 않은 라우트)
 */
export const PUBLIC_ROUTES = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/reset-password",
  "/auth/forgot-password",
] as const;

/**
 * 현재 경로가 공개 라우트인지 확인
 */
export const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
};
