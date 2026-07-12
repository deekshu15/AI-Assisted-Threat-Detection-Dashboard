import { Box, Grid } from "@mui/material";

import { PageHeader } from "../../components/ui/page-header";

import ThreatTrend from "./components/ThreatTrend";
import ModelPerformance from "./components/ModelPerformance";

function AnalyticsPage() {
  return (
    <Box>
      <PageHeader
        title="Analytics"
        subtitle="Security trends and AI model performance."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <ThreatTrend />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <ModelPerformance />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AnalyticsPage;