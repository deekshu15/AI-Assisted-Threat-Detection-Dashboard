import Grid from "@mui/material/Grid";

import UploadCard from "./UploadCard";
import SupportedFormats from "./SupportedFormats";
import UploadHistory from "./UploadHistory";
import PipelineStatus from "./PipelineStatus";
import StreamStatus from "./StreamStatus";

function UploadCenter() {
  return (
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
        <UploadCard />
      </Grid>

      <Grid
        size={{
          xs: 12,
          lg: 6,
        }}
      >
        <SupportedFormats />
      </Grid>

      <Grid
        size={{
          xs: 12,
          lg: 6,
        }}
      >
        <UploadHistory />
      </Grid>

      <Grid
        size={{
          xs: 12,
          lg: 6,
        }}
      >
        <PipelineStatus />
      </Grid>

      <Grid
        size={{
          xs: 12,
        }}
      >
        <StreamStatus />
      </Grid>
    </Grid>
  );
}

export default UploadCenter;