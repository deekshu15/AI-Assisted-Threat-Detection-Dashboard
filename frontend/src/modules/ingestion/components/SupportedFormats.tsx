import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";

import {
  Chip,
  Stack,
} from "@mui/material";

import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";

const formats = [
  ".csv",
  ".json",
  ".evtx",
  ".txt",
  ".log",
  ".xml",
];

function SupportedFormats() {
  return (
    <DashboardWidget
      title="Supported Formats"
      subtitle="Accepted log file types"
      height={220}
    >
      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        useFlexGap
      >
        {formats.map((format) => (
          <Chip
            key={format}
            icon={<InsertDriveFileRoundedIcon />}
            label={format}
            color="primary"
            variant="outlined"
          />
        ))}
      </Stack>
    </DashboardWidget>
  );
}

export default SupportedFormats;