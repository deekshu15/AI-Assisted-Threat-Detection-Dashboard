import {
  Button,
  Stack,
  Typography,
} from "@mui/material";

import DashboardWidget from "../../dashboard/components/DashboardWidget";

function UploadCenter() {
  return (
    <DashboardWidget title="Upload Security Logs">
      <Typography mb={3}>
        Supported log formats:
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
      >
        <Button variant="contained">
          CSV
        </Button>

        <Button variant="contained">
          JSON
        </Button>

        <Button variant="contained">
          EVTX
        </Button>

        <Button variant="contained">
          Parquet
        </Button>
      </Stack>
    </DashboardWidget>
  );
}

export default UploadCenter;