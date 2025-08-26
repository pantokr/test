// components/forms/UserUpdate.tsx
import { UserUpdate } from "@/api/types/user";
import { UserUpdateApi } from "@/api/user";
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
import {
  validateDepartment,
  validateLoginID,
  validateName,
} from "../../utils/form";

interface UserUpdateFormProps {
  onSuccess?: (message: string) => void;
  initialData?: Partial<UserUpdate>;
  readOnlyId?: boolean;
}

const UserUpdateForm: React.FC<UserUpdateFormProps> = ({
  onSuccess,
  initialData,
  readOnlyId = true,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserUpdate>({
    loginID: "",
    empName: "",
    dptName: "",
    officeTel: "",
    mobileTel: "",
    updateEmpID: "",
  });
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { user } = useAuth();

  // 초기 데이터 설정
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        updateEmpID: user?.loginID || "",
      }));
    } else if (user) {
      // 기본값으로 현재 사용자 정보 사용
      setFormData({
        loginID: user.loginID || "",
        empName: user.empName || "",
        dptName: user.dptName || "",
        officeTel: user.officeTel || "",
        mobileTel: user.mobileTel || "",
        updateEmpID: user.loginID || "",
      });
    }
  }, [user, initialData]);

  const validateUserUpdateForm = (
    formData: UserUpdate,
    confirmPwd: string
  ): { valid: boolean; error?: string } => {
    let error: string | null = null;

    error = validateLoginID(formData.loginID);
    if (error) return { valid: false, error };

    error = validateName(formData.empName);
    if (error) return { valid: false, error };

    error = validateDepartment(formData.dptName);
    if (error) return { valid: false, error };

    return { valid: true };
  };

  const handleChange =
    (field: keyof UserUpdate) =>
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

    // 전체 폼 검증
    const { valid, error } = validateUserUpdateForm(
      formData,
      confirmNewPassword
    );
    if (!valid && error !== undefined) {
      setErrorMsg(error);
      setLoading(false);
      return;
    }

    // confirm 메시지
    if (!confirm("프로필을 수정하시겠습니까?")) {
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (!user) {
        setErrorMsg("사용자 정보가 없습니다. 재로그인 후 다시 시도해주세요.");
        setLoading(false);
        return;
      }

      // API 호출용 데이터 구성
      const updateData: UserUpdate = {
        ...formData,
        updateEmpID: user.loginID,
      };

      await UserUpdateApi(updateData);

      // 성공 처리
      const successMessage = "프로필이 성공적으로 수정되었습니다.";
      setSuccessMsg(successMessage);

      // 성공 콜백 호출
      onSuccess?.(successMessage);

      // 비밀번호 필드 초기화
      setFormData((prev) => ({
        ...prev,
        oldPasswd: "",
        newPasswd: "",
      }));
      setConfirmNewPassword("");
    } catch (error: any) {
      setErrorMsg(error.message || "알 수 없는 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppBox component="form" onSubmit={handleSubmit}>
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
            slotProps={{
              input: {
                readOnly: readOnlyId,
              },
            }}
            onChange={readOnlyId ? undefined : handleChange("loginID")}
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

        {/* 현재 비밀번호 */}

        <Row>
          <AppTextField
            label="전화번호"
            name="officeTel"
            id="officeTel"
            autoComplete="tel"
            type="tel"
            value={formData.officeTel}
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
            {loading ? "수정 중..." : "수정"}
          </AppButton>
        </Row>
      </Column>
    </AppBox>
  );
};

export default UserUpdateForm;
