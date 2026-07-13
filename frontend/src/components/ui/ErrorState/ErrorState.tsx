import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

function ErrorState({
  title = "Something went wrong",
  description = "Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={300}
    >
      <Stack
        spacing={2}
        alignItems="center"
      >
        <ErrorOutlineIcon
          color="error"
          sx={{ fontSize: 60 }}
        />

        <Typography variant="h6">
          {title}
        </Typography>

        <Typography color="text.secondary">
          {description}
        </Typography>

        {onRetry && (
          <Button
            variant="contained"
            onClick={onRetry}
          >
            Retry
          </Button>
        )}
      </Stack>
    </Box>
  );
}

export default ErrorState;