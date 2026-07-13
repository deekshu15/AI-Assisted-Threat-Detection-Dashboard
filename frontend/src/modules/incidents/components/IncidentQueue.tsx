import {
  Chip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import { DashboardWidget } from "../../../components/ui/DashboardWidget";

import { incidents } from "../data/incidentMock";

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

function IncidentQueue() {
  return (
    <DashboardWidget
      title="Incident Queue"
      subtitle="Open security investigations"
      height={460}
    >
      <List disablePadding>
        {incidents.map((incident) => (
          <ListItem
            key={incident.id}
            divider
            disablePadding
            sx={{ py: 2 }}
          >
            <ListItemText
              primary={incident.title}
              secondary={`${incident.assignedTo} • ${incident.createdAt}`}
            />

            <Chip
              label={incident.severity}
              color={getSeverityColor(
                incident.severity
              )}
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default IncidentQueue;