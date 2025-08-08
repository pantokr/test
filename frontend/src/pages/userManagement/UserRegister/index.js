import React, { useState } from "react";
import { Card, Select, MenuItem, InputLabel, FormControl, TextField } from "@mui/material";

import DashboardLayout from "frames/LayoutContainers/DashboardLayout";
import DashboardNavbar from "frames/Navbars/DashboardNavbar";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { validateFormData } from "./validator";

function UserRegister() {
  const [formData, setFormData] = useState({
    id: "",
    emp_name: "",
    dept_name: "NONE",
    office_tel: "",
    mobile_tel: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeptChange = (e) => {
    setFormData((prev) => ({ ...prev, dept_name: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // 에러 없으면 초기화
    alert("사용자 등록이 완료되었습니다.");
  };

  return (
    <DashboardLayout>
      <MDBox
        sx={{
          p: 3,
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: 450, mx: 2, mt: -3, p: 2 }}>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            textAlign="center"
            mb={2}
            p={2}
          >
            <MDTypography variant="h4" fontWeight="medium" color="white">
              사용자 등록
            </MDTypography>
          </MDBox>

          <MDBox component="form" onSubmit={handleSubmit} px={2}>
            {/* 사용자 ID */}
            <MDBox mb={2}>
              <TextField
                label="사용자 ID"
                variant="outlined"
                fullWidth
                name="id"
                value={formData.id}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                error={Boolean(errors.id)}
                helperText={errors.id}
              />
            </MDBox>

            {/* 비밀번호 */}
            <MDBox mb={2}>
              <TextField
                label="비밀번호"
                variant="outlined"
                fullWidth
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </MDBox>

            {/* 비밀번호 확인 */}
            <MDBox mb={2}>
              <TextField
                label="비밀번호 확인"
                variant="outlined"
                fullWidth
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
              />
            </MDBox>

            {/* 이름 */}
            <MDBox mb={2}>
              <TextField
                label="이름"
                variant="outlined"
                fullWidth
                name="emp_name"
                value={formData.emp_name}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                error={Boolean(errors.emp_name)}
                helperText={errors.emp_name}
              />
            </MDBox>

            {/* 부서 select */}
            <MDBox mb={2}>
              <FormControl
                fullWidth
                error={Boolean(errors.dept_name)}
                sx={{ height: 48 }} // height 조정 및 margin top 약간 줌
              >
                <InputLabel
                  id="dept-label"
                  sx={{
                    lineHeight: "1.2", // 텍스트 높이 맞춤
                    height: "auto", // 높이 고정 해제
                    display: "flex",
                    alignItems: "center", // 세로 정렬
                  }}
                >
                  부서
                </InputLabel>
                <Select
                  labelId="dept-label"
                  value={formData.dept_name}
                  label="부서"
                  onChange={handleDeptChange}
                  sx={{ minHeight: 48, pt: 0, pb: 0 }} // padding 위아래 제거해 select가 짤리는 문제 해결
                >
                  <MenuItem value="NONE" disabled>
                    선택하세요
                  </MenuItem>
                  <MenuItem value="개발">개발</MenuItem>
                  <MenuItem value="영업">영업</MenuItem>
                  <MenuItem value="인사">인사</MenuItem>
                  <MenuItem value="재무">재무</MenuItem>
                </Select>
                {errors.dept_name && (
                  <MDTypography variant="caption" color="error" sx={{ mt: 0.5 }}>
                    {errors.dept_name}
                  </MDTypography>
                )}
              </FormControl>
            </MDBox>

            {/* 사내 전화 */}
            <MDBox mb={2}>
              <TextField
                label="사내 전화"
                variant="outlined"
                fullWidth
                name="office_tel"
                value={formData.office_tel}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                error={Boolean(errors.office_tel)}
                helperText={errors.office_tel}
              />
            </MDBox>

            {/* 휴대폰 번호 */}
            <MDBox mb={2}>
              <TextField
                label="휴대폰 번호"
                variant="outlined"
                fullWidth
                name="mobile_tel"
                value={formData.mobile_tel}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                error={Boolean(errors.mobile_tel)}
                helperText={errors.mobile_tel}
              />
            </MDBox>

            {/* 이메일 */}
            <MDBox mb={2}>
              <TextField
                label="이메일"
                variant="outlined"
                fullWidth
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                사용자 신규 등록
              </MDButton>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default UserRegister;
