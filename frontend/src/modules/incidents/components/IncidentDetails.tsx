import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";

import {
  Avatar,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { DashboardWidget } from "../../../components/ui/DashboardWidget";

function IncidentDetails() {
  return (
    <DashboardWidget
      title="Incident Details"
      subtitle="Current selected incident"
      height={500}
    >
      <Stack spacing={3}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: "#FEE2E2",
              color: "#DC2626",
            }}
          >
            <ShieldRoundedIcon />
          </Avatar>

          <Stack>
            <Typography variant="h6" fontWeight={700}>
              Windows Brute Force Attack
            </Typography>

            <Typography color="text.secondary">
              Incident #INC-2026-00021
            </Typography>
          </Stack>
        </Stack>

        <Divider />

        <Stack spacing={2}>
          <Typography>
            <strong>Severity:</strong>{" "}
            <Chip
              label="Critical"
              color="error"
              size="small"
            />
          </Typography>

          <Typography>
            <strong>Status:</strong>{" "}
            <Chip
              label="Investigating"
              color="warning"
              size="small"
            />
          </Typography>

          <Typography>
            <strong>Source:</strong> Windows Event Logs
          </Typography>

          <Typography>
            <strong>MITRE:</strong> T1110 – Brute Force
          </Typography>

          <Typography>
            <strong>Description:</strong>
          </Typography>

          <Typography color="text.secondary">
            Multiple failed authentication attempts were
            detected from the same external IP address.
            AI models classified the activity as a
            high-confidence brute-force attack.
          </Typography>
        </Stack>
      </Stack>
    </DashboardWidget>
  );
}

export default IncidentDetails;