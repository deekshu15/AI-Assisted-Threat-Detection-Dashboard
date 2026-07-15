import { useEffect, useState } from "react";

import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

import {
  Avatar,
  Chip,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import { DashboardWidget } from "../../../components/ui/DashboardWidget";

import siemService from "../services/siemService";
import { SIEMEvent } from "../types/siem";

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
  const [events, setEvents] = useState<SIEMEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    siemService
      .getEvents()
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <DashboardWidget
      title="Live Event Stream"
      subtitle="Incoming security events"
      height={450}
    >
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <List disablePadding>
          {events.map((event) => (
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
      )}
    </DashboardWidget>
  );
}

export default LiveEventStream;