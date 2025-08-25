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
import { useAuth } from "@/context";
import { AutocompleteRenderInputParams } from "@mui/material";
import React, { useEffect, useState } from "react";
import { validateUserRegistrationForm } from "./utils";

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
    loginID: "",
    empName: "",
    dptName: "",
    officeTel: "",
    mobileTel: "",
    regEmpID: "",
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { user } = useAuth();

  // 초기 데이터 설정
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        regEmpID: user?.loginID || "",
      }));
    } else {
      // 기본값 설정
      setFormData((prev) => ({
        ...prev,
        regEmpID: user?.loginID || "",
      }));
    }
  }, [user, initialData]);

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
    setSuccessMsg(null);

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
        regEmpID: user.loginID,
      };

      await UserRegistrationApi(registrationData);

      // 성공 처리
      const successMessage = "사용자 등록이 완료되었습니다.";
      setSuccessMsg(successMessage);

      // 성공 콜백 호출
      onSuccess?.(successMessage);

      // 폼 초기화
      setFormData({
        loginID: "",
        empName: "",
        dptName: "",
        officeTel: "",
        mobileTel: "",
        regEmpID: user.loginID,
      });
    } catch (error: any) {
      setErrorMsg(error.message || "알 수 없는 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppBox component="form" sx={{ width: "60%" }} onSubmit={handleSubmit}>
      <Column>
        <Row mainAxisAlignment="start">
          <AppTextField
            label="ID"
            name="username"
            id="username"
            autoComplete="username"
            value={formData.loginID}
            required={true}
            sx={{ flex: 1 }}
            onChange={handleChange("loginID")}
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

        <Row>
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

        <Row mainAxisAlignment="end">
          <AppAutocomplete
            label="부서"
            options={["재무", "인사", "총무", "기타"]}
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
            sx={{ flex: 1, maxWidth: "25%", minWidth: "160px" }}
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

        {successMsg && (
          <Row>
            <AppTypography style={{ color: "green" }}>
              {successMsg}
            </AppTypography>
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
