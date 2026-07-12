import {
  Box,
  CircularProgress,
} from "@mui/material";

function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 5,
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loading;