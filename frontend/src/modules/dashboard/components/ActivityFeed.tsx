import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";

const activities = [
  {
    id: 1,
    icon: <WarningAmberRoundedIcon />,
    color: "#DC2626",
    background: "#FEE2E2",
    title: "Brute-force attack detected",
    description: "Windows Server 01",
    time: "2 min ago",
  },
  {
    id: 2,
    icon: <SecurityRoundedIcon />,
    color: "#0284C7",
    background: "#E0F2FE",
    title: "Threat Intelligence Updated",
    description: "New IOC signatures loaded",
    time: "8 min ago",
  },
  {
    id: 3,
    icon: <UploadRoundedIcon />,
    color: "#0EA5E9",
    background: "#E0F2FE",
    title: "New log batch uploaded",
    description: "2.3 GB processed",
    time: "14 min ago",
  },
  {
    id: 4,
    icon: <LoginRoundedIcon />,
    color: "#16A34A",
    background: "#DCFCE7",
    title: "Administrator Login",
    description: "Security Analyst Portal",
    time: "26 min ago",
  },
];

function ActivityFeed() {
  return (
    <DashboardWidget
      title="Activity Feed"
      subtitle="Latest platform activities"
      height={420}
    >
      <List disablePadding>
        {activities.map((activity) => (
          <ListItem
            key={activity.id}
            divider
            disablePadding
            sx={{ py: 2 }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: activity.background,
                  color: activity.color,
                }}
              >
                {activity.icon}
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={
                <Typography fontWeight={600}>
                  {activity.title}
                </Typography>
              }
              secondary={
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {activity.description}
                </Typography>
              }
            />

            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                {activity.time}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default ActivityFeed;