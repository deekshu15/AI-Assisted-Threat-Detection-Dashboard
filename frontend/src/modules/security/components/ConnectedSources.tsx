import Grid from "@mui/material/Grid";

import SourceCard from "./SourceCard";

import { securitySources } from "../data/securityMock";

function ConnectedSources() {
  return (
    <Grid container spacing={3}>
      {securitySources.map((source) => (
        <Grid
          key={source.id}
          size={{
            xs: 12,
            md: 6,
            xl: 4,
          }}
        >
          <SourceCard source={source} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ConnectedSources;