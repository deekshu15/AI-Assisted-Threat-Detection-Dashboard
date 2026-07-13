import Grid from "@mui/material/Grid";

import PageHeader from "../../components/ui/PageHeader/PageHeader";

import ThreatFeedSummary from "./components/ThreatFeedSummary";
import ThreatFeedStatus from "./components/ThreatFeedStatus";
import LatestCVEs from "./components/LatestCVEs";
import IOCList from "./components/IOCList";
import MalwareFamilies from "./components/MalwareFamilies";
import MitreTechniques from "./components/MitreTechniques";

function ThreatIntelligencePage() {
  return (
    <>
      <PageHeader
        title="Threat Intelligence"
        subtitle="Monitor external intelligence feeds, vulnerabilities, malware families, and indicators of compromise."
      />

      <ThreatFeedSummary />

      <Grid
        container
        spacing={3}
        mt={1}
      >
        <Grid size={{ xs: 12, lg: 6 }}>
          <ThreatFeedStatus />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <LatestCVEs />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <IOCList />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <MalwareFamilies />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <MitreTechniques />
        </Grid>
      </Grid>
    </>
  );
}

export default ThreatIntelligencePage;