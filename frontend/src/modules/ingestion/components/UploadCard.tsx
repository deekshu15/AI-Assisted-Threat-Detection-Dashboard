import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";

import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";

function UploadCard() {
  return (
    <DashboardWidget
      title="Upload Security Logs"
      subtitle="Import datasets into the ingestion pipeline"
      height={340}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={3}
        height="100%"
      >
        <Avatar
          sx={{
            width: 72,
            height: 72,
            bgcolor: "#E0F2FE",
            color: "#0284C7",
          }}
        >
          <CloudUploadRoundedIcon fontSize="large" />
        </Avatar>

        <Typography
          variant="h6"
          fontWeight={600}
        >
          Drag & Drop Files
        </Typography>

        <Typography
          color="text.secondary"
          textAlign="center"
        >
          Upload Windows, Linux, Firewall,
          Authentication or Threat Intelligence logs.
        </Typography>

        <Button
          variant="contained"
          size="large"
        >
          Select Files
        </Button>
      </Stack>
    </DashboardWidget>
  );
}

export default UploadCard;