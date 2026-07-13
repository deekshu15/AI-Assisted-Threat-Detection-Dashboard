import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import Grid from "@mui/material/Grid";

import { StatusCard } from "../../../components/ui/StatusCard";

function IncidentStatistics() {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Open Incidents"
          value="18"
          trend={3}
          subtitle="Requires investigation"
          icon={<WarningAmberRoundedIcon />}
          color="#DC2626"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Resolved Today"
          value="11"
          trend={8}
          subtitle="Completed investigations"
          icon={<TaskAltRoundedIcon />}
          color="#10B981"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Active Analysts"
          value="9"
          trend={1}
          subtitle="SOC Team"
          icon={<PersonRoundedIcon />}
          color="#0284C7"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Avg Response"
          value="12 min"
          trend={-4}
          subtitle="Mean response time"
          icon={<AccessTimeRoundedIcon />}
          color="#F59E0B"
        />
      </Grid>
    </Grid>
  );
}

export default IncidentStatistics;