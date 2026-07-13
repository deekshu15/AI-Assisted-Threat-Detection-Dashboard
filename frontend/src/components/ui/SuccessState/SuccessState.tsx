import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {
  Box,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
  description?: string;
}

function SuccessState({
  title,
  description,
}: Props) {
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
        <CheckCircleIcon
          color="success"
          sx={{ fontSize: 60 }}
        />

        <Typography variant="h6">
          {title}
        </Typography>

        {description && (
          <Typography color="text.secondary">
            {description}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

export default SuccessState;