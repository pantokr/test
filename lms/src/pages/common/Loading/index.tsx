import { AppBox } from "@/components/common/Box";
import AppTypography from "@/components/common/Typography";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { CircularProgress } from "@mui/material";

const LoadingPage = ({ title = "" }) => {
  return (
    <DashboardLayout>
      <AppBox
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height={400}
      >
        <AppTypography variant="h6" gutterBottom>
          {title || "로딩 중..."}
        </AppTypography>
        <CircularProgress />
      </AppBox>
    </DashboardLayout>
  );
};

export default LoadingPage;
