import { Box, Grid } from "@mui/material";

import { PageHeader } from "../../components/ui/page-header";

import LiveEventStream from "./components/LiveEventStream";
import EventExplorer from "./components/EventExplorer";

function SIEMMonitoringPage() {
  return (
    <Box>
      <PageHeader
        title="SIEM Monitoring"
        subtitle="Monitor normalized security events in real time."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <LiveEventStream />
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <EventExplorer />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SIEMMonitoringPage;