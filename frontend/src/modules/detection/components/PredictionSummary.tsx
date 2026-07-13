import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";

import Grid from "@mui/material/Grid";

import { StatusCard } from "../../../components/ui/StatusCard";

function PredictionSummary() {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Threats Detected"
          value="1,248"
          trend={11}
          subtitle="AI identified"
          icon={<BugReportRoundedIcon />}
          color="#DC2626"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Anomalies"
          value="318"
          trend={6}
          subtitle="Isolation Forest"
          icon={<PsychologyRoundedIcon />}
          color="#1D4ED8"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="False Positives"
          value="14"
          trend={-3}
          subtitle="Lower is better"
          icon={<ReportProblemRoundedIcon />}
          color="#F59E0B"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6, xl: 3 }}>
        <StatusCard
          title="Confidence"
          value="98%"
          trend={2}
          subtitle="Overall prediction"
          icon={<VerifiedRoundedIcon />}
          color="#10B981"
        />
      </Grid>
    </Grid>
  );
}

export default PredictionSummary;