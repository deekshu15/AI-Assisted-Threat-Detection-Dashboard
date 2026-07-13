import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";

import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";

function UploadCenter() {
  return (
    <DashboardWidget
      title="Upload Center"
      subtitle="Upload security logs for analysis"
      height={420}
    >
      <Stack
        spacing={3}
        justifyContent="space-between"
        height="100%"
      >
        <Box
          sx={{
            border: "2px dashed",
            borderColor: "primary.main",
            borderRadius: 4,
            p: 5,
            textAlign: "center",
            bgcolor: "#F8FBFF",
          }}
        >
          <CloudUploadRoundedIcon
            color="primary"
            sx={{
              fontSize: 56,
              mb: 2,
            }}
          />

          <Typography
            variant="h6"
            fontWeight={600}
          >
            Drag & Drop Log Files
          </Typography>

          <Typography
            mt={1}
            color="text.secondary"
          >
            CSV • JSON • EVTX • TXT
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
          >
            Browse Files
          </Button>
        </Box>

        <Divider />

        <Stack spacing={2}>
          <Typography fontWeight={600}>
            Supported Formats
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
          >
            <Chip
              icon={<InsertDriveFileRoundedIcon />}
              label=".csv"
            />

            <Chip
              icon={<InsertDriveFileRoundedIcon />}
              label=".json"
            />

            <Chip
              icon={<InsertDriveFileRoundedIcon />}
              label=".evtx"
            />

            <Chip
              icon={<InsertDriveFileRoundedIcon />}
              label=".txt"
            />
          </Stack>
        </Stack>
      </Stack>
    </DashboardWidget>
  );
}

export default UploadCenter;