import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import { DashboardWidget } from "../../../components/ui/DashboardWidget";

import { evidenceTimeline } from "../data/incidentMock";

function EvidenceTimeline() {
  return (
    <DashboardWidget
      title="Evidence Timeline"
      subtitle="Investigation history"
      height={500}
    >
      <List disablePadding>
        {evidenceTimeline.map((item) => (
          <ListItem
            key={item.id}
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
                <HistoryRoundedIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={item.description}
              secondary={item.time}
            />
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default EvidenceTimeline;