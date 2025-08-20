// 실시간 validation 함수들
export const validateLoginID = (value: string): string | null => {
  if (!value.trim()) return "ID는 필수입니다";
  if (value.length < 4) return "ID는 최소 4자 이상이어야 합니다";
  if (!/^[a-zA-Z0-9]+$/.test(value))
    return "ID는 영문자와 숫자만 사용할 수 있습니다";
  return null;
};

export const validatePassword = (value: string): string | null => {
  if (!value) return "비밀번호는 필수입니다";
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

export const validateEmail = (value: string): string | null => {
  if (!value) return null; // 선택사항
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return "올바른 이메일 형식이 아닙니다";
  return null;
};

//   // 전체 폼 검증
//   export const validateForm = (): boolean => {
//     const newErrors: ValidationErrors = {};

//     newErrors.loginID = validateLoginID(formData.loginID);
//     newErrors.passwd = validatePassword(formData.passwd);
//     newErrors.confirmPassword = validateConfirmPassword(formData.passwd, confirmPassword);
//     newErrors.empName = validateName(formData.empName);
//     newErrors.email = validateEmail(formData.email);

//     // undefined인 에러들 제거
//     Object.keys(newErrors).forEach(key => {
//       if (!newErrors[key as keyof ValidationErrors]) {
//         delete newErrors[key as keyof ValidationErrors];
//       }
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
