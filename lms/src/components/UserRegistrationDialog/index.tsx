// components/UserRegistrationDialog/index.tsx
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
import { AppPasswordField } from "@/components/common/TextField";
import AppTypography from "@/components/common/Typography";
import { useAuth } from "@/context";
import CloseIcon from "@mui/icons-material/Close";
import {
  AutocompleteRenderInputParams,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { validateRegistrationForm } from "../../pages/UserManagement/UserRegistration/utils";

interface UserRegistrationDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const UserRegistrationDialog: React.FC<UserRegistrationDialogProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserRegistration>({
    loginID: "",
    passwd: "",
    empName: "",
    dptName: "",
    officeTel: "",
    mobileTel: "",
    email: "",
    regEmpID: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { user } = useAuth();

  // Dialog가 열릴 때마다 폼 초기화
  useEffect(() => {
    if (open) {
      setFormData({
        loginID: "",
        passwd: "",
        empName: "",
        dptName: "",
        officeTel: "",
        mobileTel: "",
        email: "",
        regEmpID: "",
      });
      setConfirmPassword("");
      setErrorMsg(null);
      setSuccessMsg(null);
      setLoading(false);
    }
  }, [open]);

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
    setLoading(true);

    // confirm 메시지
    if (!confirm("사용자를 등록하시겠습니까?")) {
      setLoading(false);
      return;
    }

    // 전체 폼 검증
    const { valid, error } = validateRegistrationForm(
      formData,
      confirmPassword
    );
    if (!valid && error !== undefined) {
      setErrorMsg(error);
      setLoading(false);
      return;
    }

    // 모든 검증이 통과하면 폼 제출
    try {
      if (!user) {
        setErrorMsg("등록자 정보가 없습니다. 재로그인 후 다시 시도해주세요.");
        setLoading(false);
        return;
      }
      formData.regEmpID = user.loginID;
      await UserRegistrationApi(formData);

      // 성공 처리
      alert("사용자 등록이 완료되었습니다.");
      onSuccess?.(); // 성공 콜백 호출
      onClose(); // Dialog 닫기
    } catch (error: any) {
      setErrorMsg(error.message || "알 수 없는 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: "500px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        사용자 등록
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <AppBox
          component="form"
          onSubmit={handleSubmit}
          id="user-registration-form"
        >
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
              <AppPasswordField
                label="비밀번호"
                name="password"
                id="password"
                value={formData.passwd}
                autoComplete="new-password"
                sx={{ flex: 1 }}
                onChange={handleChange("passwd")}
              />
              <AppPasswordField
                label="비밀번호 확인"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                autoComplete="new-password"
                onChange={(event) => setConfirmPassword(event.target.value)}
                sx={{ flex: 1 }}
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

            <Row>
              <AppTextField
                label="이메일"
                name="email"
                value={formData.email}
                sx={{ flex: 1 }}
                onChange={handleChange("email")}
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

            {errorMsg && (
              <Row>
                <AppTypography style={{ color: "red" }}>
                  {errorMsg}
                </AppTypography>
              </Row>
            )}

            {successMsg && (
              <Row>
                <AppTypography style={{ color: "green" }}>
                  {successMsg}
                </AppTypography>
              </Row>
            )}
          </Column>
        </AppBox>
      </DialogContent>

      <DialogActions sx={{ padding: 2 }}>
        <AppButton onClick={onClose} disabled={loading}>
          취소
        </AppButton>
        <AppButton
          type="submit"
          form="user-registration-form"
          disabled={loading}
        >
          {loading ? "등록 중..." : "등록"}
        </AppButton>
      </DialogActions>
    </Dialog>
  );
};

export default UserRegistrationDialog;
