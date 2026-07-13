import PublicRoundedIcon from "@mui/icons-material/PublicRounded";

import Grid from "@mui/material/Grid";

import { StatusCard } from "../../../components/ui/StatusCard";

function ThreatFeedSummary() {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Threat Feeds"
          value="12"
          trend={2}
          subtitle="Connected providers"
          icon={<PublicRoundedIcon />}
          color="#1D4ED8"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Active IOCs"
          value="8,924"
          trend={7}
          subtitle="Indicators monitored"
          icon={<PublicRoundedIcon />}
          color="#0284C7"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Critical CVEs"
          value="32"
          trend={5}
          subtitle="Require patching"
          icon={<PublicRoundedIcon />}
          color="#DC2626"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Malware Families"
          value="84"
          trend={3}
          subtitle="Tracked globally"
          icon={<PublicRoundedIcon />}
          color="#10B981"
        />
      </Grid>
    </Grid>
  );
}

export default ThreatFeedSummary;