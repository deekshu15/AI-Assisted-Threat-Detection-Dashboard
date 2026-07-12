import { Box, Grid } from "@mui/material";

import { PageHeader } from "../../components/ui/page-header";

import KPICards from "./components/KPICards";
import ThreatTimeline from "./components/ThreatTimeline";
import ThreatDistribution from "./components/ThreatDistribution";
import RecentAlerts from "./components/RecentAlerts";
import SecuritySources from "./components/SecuritySources";
import SystemHealth from "./components/SystemHealth";
import ActivityFeed from "./components/ActivityFeed";
import AIInsights from "./components/AIInsights";

function DashboardPage() {
  return (
    <Box>
      <PageHeader
        title="Dashboard"
        subtitle="Security Operations Center"
      />

      <KPICards />

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <ThreatTimeline />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <ThreatDistribution />
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <RecentAlerts />
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <SecuritySources />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <SystemHealth />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <ActivityFeed />
        </Grid>

        <Grid size={12}>
          <AIInsights />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardPage;