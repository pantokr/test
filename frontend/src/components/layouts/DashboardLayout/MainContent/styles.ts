import { AppBox } from "@/components/common/Box";
import { styled } from "@mui/material/styles";

export const ContentWrapper = styled(AppBox)({
  flex: 1,
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center", // 가로 중앙 정렬
  justifyContent: "flex-start", // 위쪽부터 배치  justifyContent: "center",
  width: "100%",
  minHeight: 0,
  padding: 16,
});
