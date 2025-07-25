const MDCheckbox = styled(Checkbox)(({ theme, ownerState }) => {
  const { palette } = theme;
  const { error, success, disabled } = ownerState;

  return {
    color: disabled
      ? palette.grey[400]
      : error
        ? palette.error.main
        : success
          ? palette.success.main
          : palette.primary.main,

    "&.Mui-checked": {
      color: error
        ? palette.error.main
        : success
          ? palette.success.main
          : palette.primary.main,
    },
  };
});
