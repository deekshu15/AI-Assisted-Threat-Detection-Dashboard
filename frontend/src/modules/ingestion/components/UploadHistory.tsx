import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";

import { uploadHistory } from "../data/ingestionMock";

function getStatusColor(
  status: string
): "success" | "warning" | "error" {
  switch (status) {
    case "Completed":
      return "success";

    case "Processing":
      return "warning";

    default:
      return "error";
  }
}

function UploadHistory() {
  return (
    <DashboardWidget
      title="Upload History"
      subtitle="Recently uploaded log files"
      height={420}
    >
      <List disablePadding>
        {uploadHistory.map((file) => (
          <ListItem
            key={file.id}
            divider
            disablePadding
            sx={{ py: 1.5 }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: "#E0F2FE",
                  color: "#0284C7",
                }}
              >
                <DescriptionRoundedIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={file.fileName}
              secondary={`${file.size} • ${file.uploadedAt}`}
            />

            <Chip
              label={file.status}
              color={getStatusColor(file.status)}
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default UploadHistory;