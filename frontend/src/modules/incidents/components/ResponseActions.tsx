import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

import {
  Button,
  Stack,
} from "@mui/material";

import { DashboardWidget } from "../../../components/ui/DashboardWidget";

const actions = [
  "Isolate Endpoint",
  "Block IP Address",
  "Disable User Account",
  "Create Ticket",
  "Notify SOC Team",
];

function ResponseActions() {
  return (
    <DashboardWidget
      title="Response Actions"
      subtitle="Recommended containment actions"
      height={500}
    >
      <Stack spacing={2}>
        {actions.map((action) => (
          <Button
            key={action}
            fullWidth
            variant="contained"
            startIcon={<PlayArrowRoundedIcon />}
          >
            {action}
          </Button>
        ))}
      </Stack>
    </DashboardWidget>
  );
}

export default ResponseActions;