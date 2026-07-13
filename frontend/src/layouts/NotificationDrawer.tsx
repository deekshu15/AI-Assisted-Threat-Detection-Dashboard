import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

import {
  Badge,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";

const notifications = [
  {
    id: 1,
    title: "Brute-force attack detected",
    time: "2 min ago",
  },
  {
    id: 2,
    title: "Isolation Forest detected anomaly",
    time: "8 min ago",
  },
  {
    id: 3,
    title: "Threat intelligence updated",
    time: "20 min ago",
  },
];

function NotificationDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <Badge
          badgeContent={notifications.length}
          color="error"
        >
          <NotificationsRoundedIcon />
        </Badge>
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Typography
          variant="h6"
          p={3}
        >
          Notifications
        </Typography>

        <Divider />

        <List sx={{ width: 360 }}>
          {notifications.map((item) => (
            <ListItem key={item.id}>
              <ListItemIcon>
                <WarningRoundedIcon color="warning" />
              </ListItemIcon>

              <ListItemText
                primary={item.title}
                secondary={item.time}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default NotificationDrawer;