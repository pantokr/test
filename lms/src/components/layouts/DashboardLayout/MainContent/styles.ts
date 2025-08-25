import { AppBox } from "@/components/common/Box";
import { styled } from "@mui/material/styles";

export const ContentWrapper = styled(AppBox)({
  flex: 1,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "90%",
  minHeight: 0,
  padding: 4,
});
