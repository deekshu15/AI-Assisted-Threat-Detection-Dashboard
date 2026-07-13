import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";

import { DashboardWidget } from "../../../components/ui/DashboardWidget";

import { latestCVEs } from "../data/intelligenceMock";

function getColor(
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

function LatestCVEs() {
  return (
    <DashboardWidget
      title="Latest CVEs"
      subtitle="Newest published vulnerabilities"
      height={440}
    >
      <List disablePadding>
        {latestCVEs.map((cve) => (
          <ListItem
            key={cve.id}
            divider
            disablePadding
            sx={{ py: 2 }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: "#FEE2E2",
                  color: "#DC2626",
                }}
              >
                <BugReportRoundedIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={cve.id}
              secondary={cve.description}
            />

            <Chip
              label={cve.severity}
              color={getColor(cve.severity)}
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default LatestCVEs;