import { Link } from "react-router-dom";
import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

// Authentication layout components
import CoverLayout from "pages/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function SignUp() {
  const [department, setDepartment] = useState("");

  return (
    <CoverLayout image={bgImage}>
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
            회원가입
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox display="flex" mb={2}>
              <MDInput
                type="text"
                label="사번 (ID)"
                variant="standard"
                fullWidth
                InputLabelProps={{
                  sx: {
                    lineHeight: 1.2,
                  },
                }}
              />
            </MDBox>
            <MDBox display="flex" mb={2} gap={2}>
              <MDInput
                type="password"
                label="비밀번호"
                variant="standard"
                fullWidth
                InputLabelProps={{ sx: { lineHeight: 1.2 } }}
              />
              <MDInput
                type="password"
                label="비밀번호 확인"
                variant="standard"
                fullWidth
                InputLabelProps={{ sx: { lineHeight: 1.2 } }}
              />
            </MDBox>
            <MDBox display="flex" mb={2} gap={2}>
              <MDInput
                type="text"
                label="이름"
                variant="standard"
                fullWidth
                sx={{ flex: 1 }} // 👈 추가!
                InputLabelProps={{ sx: { lineHeight: 1.2 } }}
              />

              <FormControl variant="standard" fullWidth sx={{ flex: 1 }}>
                <InputLabel id="department-label" sx={{ lineHeight: 1.2 }}>
                  부서명
                </InputLabel>
                <Select
                  labelId="department-label"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  sx={{ lineHeight: 1.2, padddingTop: 1, paddingBottom: 1 }}
                >
                  <MenuItem value="영업팀">영업팀</MenuItem>
                  <MenuItem value="기획팀">기획팀</MenuItem>
                  <MenuItem value="개발팀">개발팀</MenuItem>
                  <MenuItem value="디자인팀">디자인팀</MenuItem>
                </Select>
              </FormControl>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="tel"
                label="사무실 전화번호"
                variant="standard"
                fullWidth
                InputLabelProps={{
                  sx: {
                    lineHeight: 1.2,
                  },
                }}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="tel"
                label="휴대전화번호"
                variant="standard"
                fullWidth
                InputLabelProps={{
                  sx: {
                    lineHeight: 1.2,
                  },
                }}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth>
                회원가입
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                이미 계정을 가지고 계신가요?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  로그인
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default SignUp;
