import { AppBox } from "@/components/common/Box";
import { styled } from "@mui/material/styles";

export const ContentWrapper = styled(AppBox)({
  flex: 1,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minHeight: 0,
  padding: 4,
});
