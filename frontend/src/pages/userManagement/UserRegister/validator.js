// ./utils/validation.js

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const existingIds = ["user1", "admin", "test"]; // 예시 기존 ID 목록

export const validateFormData = (formData) => {
  const errors = {};
  const { id, password, confirmPassword, emp_name, email, dept_name, office_tel, mobile_tel } =
    formData;

  if (!id.trim()) errors.id = "사용자 ID를 입력하세요.";
  if (!password) errors.password = "비밀번호를 입력하세요.";
  if (!confirmPassword) errors.confirmPassword = "비밀번호 확인을 입력하세요.";
  if (password !== confirmPassword) errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
  if (!emp_name.trim()) errors.emp_name = "이름을 입력하세요.";
  if (!dept_name) errors.dept_name = "부서를 선택하세요.";

  // 이메일 형식 검사 (입력된 경우에만)
  if (email && !validateEmail(email)) errors.email = "올바른 이메일 형식이 아닙니다.";

  // 전화번호는 임의로 필수 검사 추가할 수도 있음
  if (!office_tel.trim()) errors.office_tel = "사내 전화를 입력하세요.";
  if (!mobile_tel.trim()) errors.mobile_tel = "휴대폰 번호를 입력하세요.";

  return errors;
};
