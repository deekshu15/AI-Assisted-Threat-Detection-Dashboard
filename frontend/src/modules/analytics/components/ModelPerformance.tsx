import {
  Avatar,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";

import { DashboardWidget } from "../../../components/ui/DashboardWidget";

import { modelPerformance } from "../data/analyticsMock";

function ModelPerformance() {
  return (
    <DashboardWidget
      title="AI Model Performance"
      subtitle="Current ML model accuracy"
      height={430}
    >
      <List disablePadding>
        {modelPerformance.map((model) => (
          <ListItem
            key={model.model}
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
                <PsychologyRoundedIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={model.model}
              secondary={
                <>
                  <LinearProgress
                    variant="determinate"
                    value={model.accuracy}
                    sx={{
                      mt: 1,
                      mb: 1,
                      height: 8,
                      borderRadius: 5,
                    }}
                  />

                  <Typography variant="caption">
                    Accuracy {model.accuracy}%
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default ModelPerformance;