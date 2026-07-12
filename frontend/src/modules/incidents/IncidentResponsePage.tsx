import { Box, Grid } from "@mui/material";

import { PageHeader } from "../../components/ui/page-header";

import IncidentQueue from "./components/IncidentQueue";
import IncidentStatistics from "./components/IncidentStatistics";

function IncidentResponsePage() {
  return (
    <Box>
      <PageHeader
        title="Incident Response"
        subtitle="Investigate and manage detected security incidents."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <IncidentQueue />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <IncidentStatistics />
        </Grid>
      </Grid>
    </Box>
  );
}

export default IncidentResponsePage;