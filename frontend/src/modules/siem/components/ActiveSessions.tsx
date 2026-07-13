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

import { activeSessions } from "../data/siemMock";

function ActiveSessions() {
  return (
    <DashboardWidget
      title="Active Sessions"
      subtitle="Authenticated user sessions"
      height={450}
    >
      <List disablePadding>
        {activeSessions.map((session) => (
          <ListItem
            key={session.id}
            divider
            disablePadding
            sx={{ py: 2 }}
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
              primary={session.username}
              secondary={session.ipAddress}
            />

            <Chip
              size="small"
              label={session.status}
              color={
                session.status === "Active"
                  ? "success"
                  : "warning"
              }
            />
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default ActiveSessions;