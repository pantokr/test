// components/forms/UserRegistration.tsx
import { UserRegistration } from "@/api/types/user";
import { UserRegistrationApi } from "@/api/user";
import {
  AppAutocomplete,
  AppButton,
  AppTextField,
  Column,
  Row,
} from "@/components/common";
import { AppBox } from "@/components/common/Box";
import AppTypography from "@/components/common/Typography";
import { DEPARTMENT_OPTIONS, PERMISSION_OPTIONS } from "@/constants";
import { useAuth } from "@/context";
import {
  validateDepartment,
  validateLoginId,
  validateName,
} from "@/utils/form";
import { AutocompleteRenderInputParams } from "@mui/material";
import React, { useEffect, useState } from "react";

interface UserRegistrationFormProps {
  onSuccess?: (message: string) => void;
  initialData?: Partial<UserRegistration>;
}

const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({
  onSuccess,
  initialData,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserRegistration>({
    loginId: "",
    empName: "",
    dptName: "",
    officeTel: "",
    mobileTel: "",
    regEmpId: "",
    permission: "",
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { user } = useAuth();

  // 초기 데이터 설정
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        regEmpId: user?.loginId || "",
      }));
    } else {
      // 기본값 설정
      setFormData((prev) => ({
        ...prev,
        regEmpId: user?.loginId || "",
      }));
    }
  }, [user, initialData]);

  const validateUserRegistrationForm = (
    formData: UserRegistration
  ): { valid: boolean; error?: string } => {
    let error: string | null = null;

    error = validateLoginId(formData.loginId);
    if (error) return { valid: false, error };

    error = validateName(formData.empName);
    if (error) return { valid: false, error };

    error = validateDepartment(formData.dptName);
    if (error) return { valid: false, error };

    return { valid: true };
  };

  const handleChange =
    (field: keyof UserRegistration) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;
      if (field === "officeTel" || field === "mobileTel") {
        value = value.replace(/\D/g, ""); // 숫자가 아닌 문자 제거
      }

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      // 에러 메시지 초기화
      if (errorMsg) setErrorMsg(null);
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { valid, error } = validateUserRegistrationForm(formData);
    if (!valid && error !== undefined) {
      setErrorMsg(error);
      setLoading(false);
      return;
    }

    // confirm 메시지
    if (!confirm("사용자를 등록하시겠습니까?")) {
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    // 전체 폼 검증

    try {
      // 사용자 체크
      if (!user) {
        setErrorMsg("등록자 정보가 없습니다. 재로그인 후 다시 시도해주세요.");
        setLoading(false);
        return;
      }

      // API 호출용 데이터 구성
      const registrationData: UserRegistration = {
        ...formData,
        regEmpId: user.loginId,
      };

      await UserRegistrationApi(registrationData);

      // 성공 처리
      const successMessage = "사용자 등록이 완료되었습니다.";
      // setSuccessMsg(successMessage);

      // 성공 콜백 호출
      onSuccess?.(successMessage);

      // 폼 초기화
      setFormData({
        loginId: "",
        empName: "",
        officeTel: "",
        mobileTel: "",
        regEmpId: user.loginId,
        dptName: "",
        permission: "",
      });
    } catch (error: any) {
      setErrorMsg(error.message || "알 수 없는 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppBox component="form" onSubmit={handleSubmit}>
      <Column spacing={2}>
        <Row spacing={2} mainAxisAlignment="start">
          <AppTextField
            label="Id"
            name="username"
            id="username"
            autoComplete="username"
            value={formData.loginId}
            required={true}
            sx={{ flex: 1 }}
            onChange={handleChange("loginId")}
          />
          <AppTextField
            label="이름"
            name="name"
            id="name"
            autoComplete="name"
            value={formData.empName}
            required={true}
            sx={{ flex: 1 }}
            onChange={handleChange("empName")}
          />
        </Row>

        <Row spacing={2}>
          <AppTextField
            label="전화번호"
            name="officeTel"
            id="officeTel"
            autoComplete="tel"
            type="tel"
            value={formData.officeTel}
            required={true}
            sx={{ flex: 1 }}
            onChange={handleChange("officeTel")}
          />
          <AppTextField
            label="휴대전화"
            name="mobileTel"
            id="mobileTel"
            autoComplete="tel"
            type="tel"
            value={formData.mobileTel}
            required={true}
            sx={{ flex: 1 }}
            onChange={handleChange("mobileTel")}
          />
        </Row>

        <Row mainAxisAlignment="spaceBetween" spacing={2}>
          <AppAutocomplete
            label="권한"
            options={PERMISSION_OPTIONS}
            value={formData.permission}
            onChange={(event, newValue) =>
              setFormData((prev) => ({
                ...prev,
                permission: newValue || "",
              }))
            }
            renderInput={function (
              params: AutocompleteRenderInputParams
            ): React.ReactNode {
              return <AppTextField {...params} label="권한" />;
            }}
            sx={{ flex: 1 }}
          />
          <AppAutocomplete
            label="부서"
            options={DEPARTMENT_OPTIONS}
            value={formData.dptName}
            onChange={(event, newValue) =>
              setFormData((prev) => ({
                ...prev,
                dptName: newValue || "",
              }))
            }
            renderInput={function (
              params: AutocompleteRenderInputParams
            ): React.ReactNode {
              return <AppTextField {...params} label="부서" />;
            }}
            sx={{ flex: 1 }}
          />
        </Row>

        <Row>
          <AppTypography variant="body2" color="warning">
            * 비밀번호는 초기값으로 ID와 동일하게 설정됩니다.
          </AppTypography>
        </Row>

        {/* 메시지 표시 */}
        {errorMsg && (
          <Row>
            <AppTypography style={{ color: "red" }}>{errorMsg}</AppTypography>
          </Row>
        )}

        {/* 제출 버튼 */}
        <Row mainAxisAlignment="end">
          <AppButton type="submit" disabled={loading}>
            {loading ? "등록 중..." : "등록"}
          </AppButton>
        </Row>
      </Column>
    </AppBox>
  );
};

export default UserRegistrationForm;
