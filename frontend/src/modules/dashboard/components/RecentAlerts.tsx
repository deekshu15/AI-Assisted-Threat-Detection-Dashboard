import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";

const alerts = [
  {
    id: 1,
    title: "Windows Brute Force Attack",
    severity: "Critical",
    source: "Windows Event Logs",
    time: "2 min ago",
  },
  {
    id: 2,
    title: "Suspicious PowerShell Execution",
    severity: "High",
    source: "Microsoft Defender",
    time: "8 min ago",
  },
  {
    id: 3,
    title: "Firewall Port Scan",
    severity: "Medium",
    source: "AWS Network Firewall",
    time: "15 min ago",
  },
  {
    id: 4,
    title: "Failed Administrator Login",
    severity: "Low",
    source: "Authentication Service",
    time: "28 min ago",
  },
];

function getSeverityColor(
  severity: string
): "error" | "warning" | "success" {
  switch (severity) {
    case "Critical":
      return "error";

    case "High":
      return "warning";

    default:
      return "success";
  }
}

function RecentAlerts() {
  return (
    <DashboardWidget
      title="Recent Alerts"
      subtitle="Latest detected security events"
      height={420}
    >
      <List disablePadding>
        {alerts.map((alert) => (
          <ListItem
            key={alert.id}
            divider
            disablePadding
            sx={{
              py: 1.5,
            }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: "#FEE2E2",
                  color: "#DC2626",
                }}
              >
                <WarningAmberRoundedIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={
                <Typography fontWeight={600}>
                  {alert.title}
                </Typography>
              }
              secondary={
                <Stack
                  direction="row"
                  spacing={1}
                  mt={1}
                >
                  <Chip
                    size="small"
                    label={alert.severity}
                    color={getSeverityColor(alert.severity)}
                  />

                  <Chip
                    size="small"
                    label={alert.source}
                    variant="outlined"
                  />
                </Stack>
              }
            />

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {alert.time}
            </Typography>
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default RecentAlerts;