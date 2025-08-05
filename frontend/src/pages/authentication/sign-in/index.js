import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import BasicLayout from "pages/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import { login } from "api/auth";
import { useAuth } from "context/auth";
import { Line } from "react-chartjs-2";

function SignIn() {
  const { user, setUser } = useAuth();

  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [passwd, setpasswd] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    try {
      const data = await login({ id, passwd });
      console.log("로그인된 ID:", data.id);
      setUser({
        id: data.id,
        empName: data.empName,
        deptName: data.deptName,
        officeTel: data.officeTel,
        mobileTel: data.mobileTel,
      });
      // 로그인 성공 시 대시보드로 이동
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            LMS
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleLogin}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="ID"
                fullWidth
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="비밀번호"
                fullWidth
                value={passwd}
                onChange={(e) => setpasswd(e.target.value)}
                required
                InputLabelProps={{
                  style: {
                    lineHeight: 1.2,
                  },
                }}
              />
            </MDBox>

            {error && (
              <MDTypography color="error" variant="body2" mb={2} textAlign="center">
                {error}
              </MDTypography>
            )}

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                로그인
              </MDButton>
            </MDBox>

            {/* 계정 생성하기 링크 */}
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                계정이 없으신가요?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  계정 생성하기
                </MDTypography>
              </MDTypography>
            </MDBox> */}

            {/* 비밀번호 찾기 링크 */}
            {/* <MDBox mt={1} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                비밀번호가 기억나지 않으세요?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/reset-passwd"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  비밀번호 찾기
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default SignIn;
