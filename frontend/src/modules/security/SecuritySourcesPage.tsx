import Grid from "@mui/material/Grid";

import PageHeader from "../../components/ui/PageHeader/PageHeader";

import ConnectedSources from "./components/ConnectedSources";
import RecentEvents from "./components/RecentEvents";
import SourceHealth from "./components/SourceHealth";
import SourceStatistics from "./components/SourceStatistics";

function SecuritySourcesPage() {
  return (
    <>
      <PageHeader
        title="Security Sources"
        subtitle="Monitor connected log sources, ingestion health, and recent security events."
      />

      <SourceStatistics />

      <Grid
        container
        spacing={3}
        mt={1}
      >
        <Grid
          size={{
            xs: 12,
          }}
        >
          <ConnectedSources />
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <SourceHealth />
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <RecentEvents />
        </Grid>
      </Grid>
    </>
  );
}

export default SecuritySourcesPage;