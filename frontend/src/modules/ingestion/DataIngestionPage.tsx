import { Box, Grid } from "@mui/material";

import { PageHeader } from "../../components/ui/page-header";

import UploadCenter from "./components/UploadCenter";
import SupportedFormats from "./components/SupportedFormats";
import PipelineStatus from "./components/PipelineStatus";

function DataIngestionPage() {
  return (
    <Box>
      <PageHeader
        title="Data Ingestion"
        subtitle="Upload and monitor security log ingestion."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <UploadCenter />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <SupportedFormats />
        </Grid>

        <Grid size={12}>
          <PipelineStatus />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DataIngestionPage;