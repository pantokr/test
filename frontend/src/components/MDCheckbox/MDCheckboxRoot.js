// MDCheckboxRoot.js
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";

const MDCheckboxRoot = styled(Checkbox)(({ theme, ownerState }) => {
  const { palette } = theme;
  const { error, success, disabled } = ownerState;

  const baseColor = () => {
    if (disabled) return palette.grey[400];
    if (error) return palette.error.main;
    if (success) return palette.success.main;
    return palette.primary.main;
  };

  return {
    color: baseColor(),

    "&.Mui-checked": {
      color: baseColor(),
    },
  };
});

export default MDCheckboxRoot;
