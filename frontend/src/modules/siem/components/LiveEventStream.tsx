import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import { DashboardWidget } from "../../../components/ui/DashboardWidget";

import { liveEvents } from "../data/siemMock";

function severityColor(
  severity: string
): "success" | "warning" | "error" {
  switch (severity) {
    case "Critical":
      return "error";

    case "High":
      return "warning";

    default:
      return "success";
  }
}

function LiveEventStream() {
  return (
    <DashboardWidget
      title="Live Event Stream"
      subtitle="Incoming security events"
      height={450}
    >
      <List disablePadding>
        {liveEvents.map((event) => (
          <ListItem
            key={event.id}
            divider
            disablePadding
            sx={{ py: 1.8 }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: "#E0F2FE",
                  color: "#0284C7",
                }}
              >
                <CircleRoundedIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={event.message}
              secondary={`${event.source} • ${event.timestamp}`}
            />

            <Chip
              size="small"
              label={event.severity}
              color={severityColor(event.severity)}
            />
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default LiveEventStream;