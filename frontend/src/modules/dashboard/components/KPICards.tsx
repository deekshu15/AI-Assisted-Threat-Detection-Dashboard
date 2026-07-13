import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";

import Grid from "@mui/material/Grid";

import { StatusCard } from "../../../components/ui/StatusCard";

function KPICards() {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Threat Score"
          value="92%"
          trend={8}
          subtitle="Overall security posture"
          icon={<SecurityRoundedIcon />}
          color="#1D4ED8"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Critical Alerts"
          value={37}
          trend={5}
          subtitle="Requires investigation"
          icon={<WarningAmberRoundedIcon />}
          color="#DC2626"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Logs Processed"
          value="4.8M"
          trend={12}
          subtitle="Last 24 Hours"
          icon={<StorageRoundedIcon />}
          color="#0EA5E9"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="AI Predictions"
          value="1,274"
          trend={17}
          subtitle="Isolation Forest + XGBoost"
          icon={<PsychologyRoundedIcon />}
          color="#10B981"
        />
      </Grid>
    </Grid>
  );
}

export default KPICards;