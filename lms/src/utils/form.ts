/**
 * 실시간 Validation 함수
 */

export const validateLoginId = (value: string): string | null => {
  if (!value.trim()) return "Id는 필수입니다";
  if (value.length < 4) return "Id는 최소 4자 이상이어야 합니다";
  if (!/^[a-zA-Z0-9]+$/.test(value))
    return "Id는 영문자와 숫자만 사용할 수 있습니다";
  return null;
};

export const validatePassword = (value: string): string | null => {
  if (value.length < 8) return "비밀번호는 최소 8자 이상이어야 합니다";
  if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value))
    return "영문자와 숫자를 모두 포함해야 합니다";
  return null;
};

export const validateConfirmPassword = (
  password: string,
  confirmPwd: string
): string | null => {
  if (!confirmPwd) return "비밀번호 확인은 필수입니다";
  if (password !== confirmPwd) return "비밀번호가 일치하지 않습니다";
  return null;
};

export const validateName = (value: string): string | null => {
  if (!value.trim()) return "이름은 필수입니다";
  if (value.length < 2) return "이름은 최소 2자 이상이어야 합니다";
  return null;
};

export const validateDepartment = (value: string): string | null => {
  if (!value) return "부서는 필수입니다";
  return null;
};

/**
 * 전화번호 포맷 함수
 */
export const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, "");

  if (digits.length < 4) return digits;
  if (digits.length < 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length <= 11)
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
};
