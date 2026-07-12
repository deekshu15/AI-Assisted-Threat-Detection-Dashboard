import {
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
} from "@mui/material";

import DashboardWidget from "../../dashboard/components/DashboardWidget";
import { SIEMService } from "../services/siemService";

function LiveEventStream() {
  const events = SIEMService.getEvents();

  return (
    <DashboardWidget title="Live Event Stream">
      <List>
        {events.map((event) => (
          <ListItem key={event.id} divider>
            <ListItemText
              primary={`${event.source} • ${event.event}`}
              secondary={event.timestamp}
            />
            <Stack direction="row" spacing={1}>
              <Chip
                label={event.severity}
                color={
                  event.severity === "Critical"
                    ? "error"
                    : event.severity === "High"
                    ? "warning"
                    : "info"
                }
                size="small"
              />
              <Chip
                label={event.status}
                variant="outlined"
                size="small"
              />
            </Stack>
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default LiveEventStream;