// src/pages/auth/SignIn/index.tsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Alert,
  useTheme,
  alpha,
} from "@mui/material";
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

import CoverLayout from "@/layouts/CoverLayout";
import { useAuth } from "@/context";

const StyledCard = styled(Card)(({ theme }) => ({
  backdropFilter: "blur(20px)",
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  borderRadius: theme.spacing(2),
  boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
  maxWidth: 400,
  width: "100%",

  [theme.breakpoints.down("sm")]: {
    margin: theme.spacing(2),
    maxWidth: "calc(100% - 32px)",
  },
}));

const LogoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(3),

  "& img": {
    height: 48,
    width: "auto",
  },
}));

interface FormData {
  userId: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const theme = useTheme();

  const [formData, setFormData] = useState<FormData>({
    userId: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 폼 데이터 변경 핸들러
  const handleChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
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
      if (formData.userId && formData.password) {
        await handleLogin({
          loginID: formData.userId, // 임시로 이메일 형식 생성
          passwd: formData.password,
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
      <StyledCard>
        <CardContent sx={{ p: 4 }}>
          {/* 로고 */}
          <LogoBox>
            <Typography
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
            </Typography>
          </LogoBox>

          {/* 제목 */}
          <Box textAlign="center" mb={3}>
            <Typography variant="h5" fontWeight="medium" gutterBottom>
              환영합니다
            </Typography>
            <Typography variant="body2" color="text.secondary">
              계정으로 로그인하세요
            </Typography>
          </Box>

          {/* 에러 메시지 */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* 로그인 폼 */}
          <Box component="form" onSubmit={handleSubmit}>
            {/* 아이디 입력 */}
            <TextField
              fullWidth
              label="아이디"
              type="text"
              value={formData.userId}
              onChange={handleChange("userId")}
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
            <TextField
              fullWidth
              label="비밀번호"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange("password")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
              required
              placeholder="비밀번호를 입력하세요"
            />

            {/* 체크박스와 링크 */}
            <Box
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
            </Box>

            {/* 로그인 버튼 */}
            <Button
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
            </Button>
          </Box>
        </CardContent>
      </StyledCard>
    </CoverLayout>
  );
};

export default SignIn;
