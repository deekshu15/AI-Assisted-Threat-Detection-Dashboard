import { Box, Typography } from "@mui/material";

function EmptyState() {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
      }}
    >
      <Typography variant="h6">
        No data available
      </Typography>

      <Typography
        color="text.secondary"
      >
        Upload logs or connect a live source.
      </Typography>
    </Box>
  );
}

export default EmptyState;