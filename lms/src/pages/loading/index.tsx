import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingPage = ({ title = "" }) => {
  return (
    <Box
      display="flex"
      flexDirection="column" // 세로 방향 정렬
      justifyContent="center"
      alignItems="center"
      height={400}
    >
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      <CircularProgress />
    </Box>
  );
};

export default LoadingPage;
