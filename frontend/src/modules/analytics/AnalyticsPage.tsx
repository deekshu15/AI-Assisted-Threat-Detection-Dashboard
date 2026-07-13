import Grid from "@mui/material/Grid";

import PageHeader from "../../components/ui/PageHeader/PageHeader";

import ExecutiveSummary from "./components/ExecutiveSummary";
import ThreatTrend from "./components/ThreatTrend";
import RiskTrend from "./components/RiskTrend";
import AttackCategoryChart from "./components/AttackCategoryChart";
import SourceAnalysis from "./components/SourceAnalysis";
import ModelPerformance from "./components/ModelPerformance";
import MitreCoverage from "./components/MitreCoverage";

function AnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Security Analytics"
        subtitle="Executive cybersecurity analytics, AI performance, and strategic threat intelligence insights."
      />

      <ExecutiveSummary />

      <Grid
        container
        spacing={3}
        mt={1}
      >
        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <ThreatTrend />
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <RiskTrend />
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <AttackCategoryChart />
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <SourceAnalysis />
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <ModelPerformance />
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <MitreCoverage />
        </Grid>
      </Grid>
    </>
  );
}

export default AnalyticsPage;