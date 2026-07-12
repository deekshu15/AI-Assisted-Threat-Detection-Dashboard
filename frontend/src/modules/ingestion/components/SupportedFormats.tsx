import {
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardWidget from "../../dashboard/components/DashboardWidget";

const formats = [
  "CSV",
  "JSON",
  "EVTX",
  "Parquet",
];

function SupportedFormats() {
  return (
    <DashboardWidget title="Supported Formats">
      <Typography mb={2}>
        Accepted upload types
      </Typography>

      <List>
        {formats.map((format) => (
          <ListItem key={format}>
            <ListItemText primary={format} />
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default SupportedFormats;