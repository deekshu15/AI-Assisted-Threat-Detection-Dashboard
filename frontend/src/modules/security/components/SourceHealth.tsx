import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import { securitySources } from "../data/securityMock";

function SourceHealth() {
  return (
    <DashboardWidget
      title="Source Health"
      subtitle="Current status of connected security sources"
      height={420}
    >
      <List disablePadding>
        {securitySources.map((source) => (
          <ListItem
            key={source.id}
            divider
            disablePadding
            sx={{ py: 1.5 }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor:
                    source.status === "Healthy"
                      ? "#DCFCE7"
                      : source.status === "Warning"
                      ? "#FEF3C7"
                      : "#FEE2E2",
                  color:
                    source.status === "Healthy"
                      ? "#16A34A"
                      : source.status === "Warning"
                      ? "#D97706"
                      : "#DC2626",
                }}
              >
                {source.status === "Healthy" && (
                  <CheckCircleRoundedIcon />
                )}

                {source.status === "Warning" && (
                  <WarningAmberRoundedIcon />
                )}

                {source.status === "Critical" && (
                  <ErrorRoundedIcon />
                )}
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={source.name}
              secondary={`${source.health}% Health`}
            />

            <Chip
              size="small"
              color={
                source.status === "Healthy"
                  ? "success"
                  : source.status === "Warning"
                  ? "warning"
                  : "error"
              }
              label={source.status}
            />
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default SourceHealth;