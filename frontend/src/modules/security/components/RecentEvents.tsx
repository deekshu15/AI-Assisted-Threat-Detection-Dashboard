import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

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

import { securityEvents } from "../data/securityMock";

function getSeverityColor(
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

function RecentEvents() {
  return (
    <DashboardWidget
      title="Recent Security Events"
      subtitle="Latest ingested events"
      height={420}
    >
      <List disablePadding>
        {securityEvents.map((event) => (
          <ListItem
            key={event.id}
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
                <NotificationsRoundedIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={event.message}
              secondary={event.source}
            />

            <Typography
              variant="caption"
              sx={{
                mr: 2,
              }}
            >
              {event.timestamp}
            </Typography>

            <Chip
              label={event.severity}
              color={getSeverityColor(event.severity)}
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default RecentEvents;