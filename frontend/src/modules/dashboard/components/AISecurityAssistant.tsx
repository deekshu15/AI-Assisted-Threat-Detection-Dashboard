import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";

import {
  Button,
  Stack,
  Typography,
} from "@mui/material";

import { DashboardWidget } from "../../../components/ui/DashboardWidget";

function AISecurityAssistant() {
  return (
    <DashboardWidget
      title="AI Security Assistant"
      subtitle="Enterprise Security Copilot"
      height={320}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={3}
        height="100%"
      >
        <SmartToyRoundedIcon
          sx={{
            fontSize: 72,
            color: "#1D4ED8",
          }}
        />

        <Typography
          align="center"
          color="text.secondary"
        >
          Investigate incidents, summarize SIEM events,
          explain MITRE techniques, analyze uploaded
          logs, and generate executive reports.
        </Typography>

        <Button
          variant="contained"
          size="large"
        >
          Open AI Assistant
        </Button>
      </Stack>
    </DashboardWidget>
  );
}

export default AISecurityAssistant;