import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

import Grid from "@mui/material/Grid";

import { StatusCard } from "../../../components/ui/StatusCard";

function ExecutiveSummary() {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Threats Blocked"
          value="18,420"
          subtitle="Last 30 Days"
          trend={12}
          icon={<SecurityRoundedIcon />}
          color="#1D4ED8"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Critical Alerts"
          value="118"
          subtitle="Need Investigation"
          trend={-5}
          icon={<WarningRoundedIcon />}
          color="#DC2626"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Detection Accuracy"
          value="98.8%"
          subtitle="AI Models"
          trend={2}
          icon={<VerifiedRoundedIcon />}
          color="#10B981"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Response Time"
          value="11 min"
          subtitle="Average"
          trend={-7}
          icon={<TimerRoundedIcon />}
          color="#F59E0B"
        />
      </Grid>
    </Grid>
  );
}

export default ExecutiveSummary;