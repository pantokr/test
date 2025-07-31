import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <MDBox
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
      }}
    >
      <CircularProgress color="primary" />
      <MDTypography variant="h6" sx={{ mt: 2 }}>
        로딩 중...
      </MDTypography>
    </MDBox>
  );
}
