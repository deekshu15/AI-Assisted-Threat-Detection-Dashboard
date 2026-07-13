import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";

import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";

import { predictionHistory } from "../data/detectionMock";

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

function PredictionHistory() {
  return (
    <DashboardWidget
      title="Prediction History"
      subtitle="Latest AI predictions"
      height={450}
    >
      <List disablePadding>
        {predictionHistory.map((prediction) => (
          <ListItem
            key={prediction.id}
            divider
            disablePadding
            sx={{ py: 1.5 }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: "#E0F2FE",
                  color: "#0284C7",
                }}
              >
                <PsychologyRoundedIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={prediction.prediction}
              secondary={`${prediction.source} • Confidence ${prediction.confidence}%`}
            />

            <Typography
              variant="caption"
              sx={{ mr: 2 }}
            >
              {prediction.timestamp}
            </Typography>

            <Chip
              label={prediction.severity}
              color={getSeverityColor(prediction.severity)}
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default PredictionHistory;