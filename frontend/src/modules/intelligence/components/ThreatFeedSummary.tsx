import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";

import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import CloudDoneRoundedIcon from "@mui/icons-material/CloudDoneRounded";

import { threatFeeds } from "../data/intelligenceMock";

function ThreatFeedStatus() {
  return (
    <DashboardWidget
      title="Threat Feed Status"
      subtitle="Connected intelligence providers"
      height={420}
    >
      <List disablePadding>
        {threatFeeds.map((feed) => (
          <ListItem
            key={feed.id}
            divider
            disablePadding
            sx={{ py: 2 }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: "#DCFCE7",
                  color: "#16A34A",
                }}
              >
                <CloudDoneRoundedIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={feed.provider}
              secondary={`Updated ${feed.lastUpdated}`}
            />

            <Chip
              label={feed.status}
              color="success"
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default ThreatFeedStatus;