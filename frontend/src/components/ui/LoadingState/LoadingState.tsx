import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingStateProps {
  message?: string;
  height?: number | string;
}

function LoadingState({
  message = "Loading...",
  height = 300,
}: LoadingStateProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight={height}
      gap={2}
    >
      <CircularProgress />

      <Typography
        variant="body2"
        color="text.secondary"
      >
        {message}
      </Typography>
    </Box>
  );
}

export default LoadingState;