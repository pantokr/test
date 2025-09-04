import { AppButton } from "@/components/common";
import { AppBox } from "@/components/common/Box";
import AppTypography from "@/components/common/Typography";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBox
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <AppTypography
        variant="h1"
        sx={{
          fontSize: { xs: "4rem", md: "8rem" },
          fontWeight: "bold",
          color: "primary.main",
          mb: 2,
        }}
      >
        404
      </AppTypography>
      <AppTypography
        variant="h5"
        sx={{
          mb: 3,
          color: "text.secondary",
          maxWidth: "600px",
          px: 2,
        }}
      >
        요청하신 페이지를 찾을 수 없습니다.
      </AppTypography>
      <AppBox sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <AppButton variant="outlined" size="large" onClick={() => navigate(-1)}>
          이전 페이지
        </AppButton>
      </AppBox>
    </AppBox>
  );
};
export default NotFoundPage;
