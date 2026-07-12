import {
  Chip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import DashboardWidget from "../../dashboard/components/DashboardWidget";
import { IncidentService } from "../services/incidentService";

function IncidentQueue() {
  const incidents = IncidentService.getIncidents();

  return (
    <DashboardWidget title="Incident Queue">
      <List>
        {incidents.map((incident) => (
          <ListItem
            key={incident.id}
            divider
            secondaryAction={
              <Chip
                label={incident.status}
                color={
                  incident.status === "Resolved"
                    ? "success"
                    : incident.status === "Investigating"
                    ? "warning"
                    : "error"
                }
                size="small"
              />
            }
          >
            <ListItemText
              primary={incident.title}
              secondary={`${incident.source} • ${incident.createdAt}`}
            />
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default IncidentQueue;