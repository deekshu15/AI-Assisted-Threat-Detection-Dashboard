import Grid from "@mui/material/Grid";

import PageHeader from "../../components/ui/PageHeader/PageHeader";

import PredictionSummary from "./components/PredictionSummary";
import ModelStatus from "./components/ModelStatus";
import PredictionHistory from "./components/PredictionHistory";
import ThreatClassification from "./components/ThreatClassification";
import RiskScore from "./components/RiskScore";
import MitreMapping from "./components/MitreMapping";
import AIRecommendation from "./components/AIRecommendation";

function ThreatDetectionPage() {
  return (
    <>
      <PageHeader
        title="Threat Detection"
        subtitle="AI-powered threat analysis using Amazon SageMaker machine learning models."
      />

      <PredictionSummary />

      <Grid
        container
        spacing={3}
        mt={1}
      >
        <Grid size={{ xs: 12, lg: 6 }}>
          <ModelStatus />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <RiskScore />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <ThreatClassification />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <PredictionHistory />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <MitreMapping />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <AIRecommendation />
        </Grid>
      </Grid>
    </>
  );
}

export default ThreatDetectionPage;