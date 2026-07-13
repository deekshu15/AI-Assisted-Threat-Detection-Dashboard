import Grid from "@mui/material/Grid";

import PageHeader from "../../components/ui/PageHeader/PageHeader";

import IncidentStatistics from "./components/IncidentStatistics";
import IncidentQueue from "./components/IncidentQueue";
import IncidentDetails from "./components/IncidentDetails";
import EvidenceTimeline from "./components/EvidenceTimeline";
import ResponseActions from "./components/ResponseActions";
import AssignedAnalysts from "./components/AssignedAnalysts";

function IncidentResponsePage() {
  return (
    <>
      <PageHeader
        title="Incident Response"
        subtitle="Investigate, contain, and resolve security incidents using AI-assisted workflows."
      />

      <IncidentStatistics />

      <Grid
        container
        spacing={3}
        mt={1}
      >
        <Grid
          size={{
            xs: 12,
            lg: 5,
          }}
        >
          <IncidentQueue />
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 7,
          }}
        >
          <IncidentDetails />
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <EvidenceTimeline />
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <ResponseActions />
        </Grid>

        <Grid
          size={{
            xs: 12,
          }}
        >
          <AssignedAnalysts />
        </Grid>
      </Grid>
    </>
  );
}

export default IncidentResponsePage;