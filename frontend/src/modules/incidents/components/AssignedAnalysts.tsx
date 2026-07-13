import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import { DashboardWidget } from "../../../components/ui/DashboardWidget";

import { analysts } from "../data/incidentMock";

function AssignedAnalysts() {
  return (
    <DashboardWidget
      title="Assigned Analysts"
      subtitle="Current workload"
      height={500}
    >
      <List disablePadding>
        {analysts.map((analyst) => (
          <ListItem
            key={analyst.id}
            divider
            disablePadding
            sx={{
              py: 2,
            }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: "#E0F2FE",
                  color: "#0284C7",
                }}
              >
                <PersonRoundedIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={analyst.name}
              secondary={`${analyst.incidents} Active Incidents`}
            />

            <Chip
              label="Available"
              color="success"
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default AssignedAnalysts;