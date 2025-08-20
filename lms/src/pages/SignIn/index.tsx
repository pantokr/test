// src/pages/auth/SignIn/index.tsx

import { Person } from "@mui/icons-material";
import { Alert, InputAdornment, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { LoginCredentials } from "@/api/types";
import { AppButton, AppTextField } from "@/components/common";
import { AppBox } from "@/components/common/Box";
import { AppPasswordField } from "@/components/common/TextField";
import AppTypography from "@/components/common/Typography";
import CoverLayout from "@/components/layouts/CoverLayout";
import { useAuth } from "@/context";
import { LogoBox, StyledPaper } from "./styles";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const theme = useTheme();

  const [formData, setFormData] = useState<LoginCredentials>({
    loginID: "",
    passwd: "",
  });

  const [loading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      // 여기에 실제 로그인 API 호출 로직 구현
      // await new Promise((resolve) => setTimeout(resolve, 1000)); // 시뮬레이션
      // 임시 로그인 처리
      if (formData.loginID && formData.passwd) {
        await login({
          loginID: formData.loginID,
          passwd: formData.passwd,
        });

        navigate("/dashboard");
      } else {
        throw new Error("아이디와 비밀번호를 입력해주세요.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다.");
    }
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
              type="text"
              value={formData.loginID}
              onChange={handleChange("loginID")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
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
              <Link
                to="/auth/forgot-password"
                style={{
                  textDecoration: "none",
                  color: theme.palette.primary.main,
                }}
              >
                <Typography variant="body2">비밀번호 찾기</Typography>
              </Link>
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
        </AppBox>
      </StyledPaper>
    </CoverLayout>
  );
};

export default SignIn;
