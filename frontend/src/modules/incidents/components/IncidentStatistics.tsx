import { Grid } from "@mui/material";

import { Statistic } from "../../../components/ui/Statistic";
import DashboardWidget from "../../dashboard/components/DashboardWidget";

function IncidentStatistics() {
  return (
    <DashboardWidget title="Incident Statistics">
      <Grid container spacing={2}>
        <Grid size={{ xs: 6 }}>
          <Statistic label="Open" value={2} />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Statistic label="Resolved" value={1} />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Statistic label="Critical" value={2} />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Statistic label="Analysts" value={3} />
        </Grid>
      </Grid>
    </DashboardWidget>
  );
}

export default IncidentStatistics;