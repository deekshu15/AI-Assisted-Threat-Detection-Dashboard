import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import CloudDoneRoundedIcon from "@mui/icons-material/CloudDoneRounded";

import Grid from "@mui/material/Grid";

import { StatusCard } from "../../../components/ui/StatusCard";

function SourceStatistics() {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Connected Sources"
          value="5"
          subtitle="Active integrations"
          trend={2}
          icon={<HubRoundedIcon />}
          color="#1D4ED8"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Events Today"
          value="680K"
          subtitle="Logs processed"
          trend={14}
          icon={<StorageRoundedIcon />}
          color="#0EA5E9"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Detection Rate"
          value="98.7%"
          subtitle="Pipeline accuracy"
          trend={3}
          icon={<SecurityRoundedIcon />}
          color="#10B981"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Pipeline Health"
          value="Healthy"
          subtitle="AWS ingestion"
          trend={1}
          icon={<CloudDoneRoundedIcon />}
          color="#16A34A"
        />
      </Grid>
    </Grid>
  );
}

export default SourceStatistics;