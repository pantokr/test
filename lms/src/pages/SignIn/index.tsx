// src/pages/auth/SignIn/index.tsx

import { Person } from "@mui/icons-material";
import { Alert, InputAdornment, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoginCredentials } from "@/api/types";
import { AppButton, AppTextField } from "@/components/common";
import { AppBox } from "@/components/common/Box";
import { AppPasswordField } from "@/components/common/TextField";
import AppTypography from "@/components/common/Typography";
import CoverLayout from "@/components/layouts/CoverLayout";
import UserRegistrationDialog from "@/components/UserRegistrationDialog";
import { useAuth } from "@/context";
import { LogoBox, StyledPaper } from "./styles";

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const theme = useTheme();

  const [formData, setFormData] = useState<LoginCredentials>({
    loginID: "",
    passwd: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // 폼 데이터 변경 핸들러
  const handleChange =
    (field: keyof LoginCredentials) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      // 에러 메시지 초기화
      if (error) setError(null);
    };

  // 로그인 처리
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      // 여기에 실제 로그인 API 호출 로직 구현
      // 임시 로그인 처리
      if (formData.loginID && formData.passwd) {
        await login({
          loginID: formData.loginID,
          passwd: formData.passwd,
        });

        navigate("/dashboard");
      }
    } catch (err: any) {
      if (err.response?.data?.detail == "NO_INFO") {
        handleOpenDialog();
      } else {
        setError(err.message || "알 수 없는 오류");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleRegistrationSuccess = () => {
    // 등록 성공 후 실행할 로직
    // 예: 사용자 목록 새로고침, 토스트 메시지 표시 등
    console.log("사용자 등록이 성공했습니다!");
    // 필요시 추가 작업 수행
  };

  return (
    <CoverLayout
      image="/assets/images/bg_sign_in.jpg"
      overlay={true}
      overlayOpacity={0.4}
    >
      <StyledPaper>
        <AppBox sx={{ p: 4 }}>
          {/* 로고 */}
          <LogoBox>
            <AppTypography
              variant="h4"
              component="h1"
              fontWeight="bold"
              color="primary"
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              LMS
            </AppTypography>
          </LogoBox>

          {/* 제목 */}
          <AppBox textAlign="center" mb={3}>
            <AppTypography variant="h5" fontWeight="medium" gutterBottom>
              대출관리시스템
            </AppTypography>
            <AppTypography variant="body2" color="textSecondary">
              계정으로 로그인하세요
            </AppTypography>
          </AppBox>

          {/* 에러 메시지 */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* 로그인 폼 */}
          <AppBox component="form" onSubmit={handleSubmit}>
            {/* 아이디 입력 */}
            <AppTextField
              fullWidth
              label="아이디"
              type="text" // 아이디는 text가 맞음
              value={formData.loginID}
              onChange={handleChange("loginID")}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                },
              }}
              autoComplete="username"
              sx={{ mb: 2 }}
              required
              placeholder="아이디를 입력하세요"
            />

            {/* 비밀번호 입력 */}
            <AppPasswordField
              value={formData.passwd}
              onChange={handleChange("passwd")}
              required
            />

            {/* 체크박스와 링크 */}
            <AppBox
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              mb={3}
            >
              <AppButton onClick={handleOpenDialog}>
                <Typography variant="body2">비밀번호 찾기</Typography>
              </AppButton>
            </AppBox>

            {/* 로그인 버튼 */}
            <AppButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              loading={loading}
              disabled={loading}
              sx={{
                mb: 3,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: "medium",
              }}
            >
              {loading ? "로그인 중..." : "로그인"}
            </AppButton>
          </AppBox>
          <UserRegistrationDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            onSuccess={handleRegistrationSuccess}
          />
        </AppBox>
      </StyledPaper>
    </CoverLayout>
  );
};

export default SignInPage;
