// src/utils/route.ts

import { RouteItem } from "@/routes/types";

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
export function hasPermission(
  userPermission: string | null | undefined,
  route: RouteItem
): boolean {
  if (!route.requiredPermissions) return true; // 권한 조건 없으면 누구나 접근
  if (!userPermission) return false; // user 없으면 접근 불가
  return route.requiredPermissions.includes(userPermission);
}
