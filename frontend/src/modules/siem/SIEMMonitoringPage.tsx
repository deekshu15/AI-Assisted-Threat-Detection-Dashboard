import Grid from "@mui/material/Grid";

import PageHeader from "../../components/ui/PageHeader/PageHeader";

import AIEventSummary from "./components/AIEventSummary";
import SeverityChart from "./components/SeverityChart";
import LiveEventStream from "./components/LiveEventStream";
import CorrelationRules from "./components/CorrelationRules";
import ActiveSessions from "./components/ActiveSessions";
import EventExplorer from "./components/EventExplorer";

function SIEMMonitoringPage() {
  return (
    <>
      <PageHeader
        title="SIEM Monitoring"
        subtitle="Real-time security event monitoring, correlation, and AI-assisted analysis."
      />

      <Grid
        container
        spacing={3}
      >
        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <SeverityChart />
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <AIEventSummary />
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <LiveEventStream />
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <CorrelationRules />
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <ActiveSessions />
        </Grid>

        <Grid
          size={{
            xs: 12,
          }}
        >
          <EventExplorer />
        </Grid>
      </Grid>
    </>
  );
}

export default SIEMMonitoringPage;