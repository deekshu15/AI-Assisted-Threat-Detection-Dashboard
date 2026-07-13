import CloudDoneRoundedIcon from "@mui/icons-material/CloudDoneRounded";

import {
  Avatar,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";

import { pipelineServices } from "../data/ingestionMock";

function PipelineStatus() {
  return (
    <DashboardWidget
      title="Pipeline Status"
      subtitle="AWS ingestion pipeline"
      height={420}
    >
      <List disablePadding>
        {pipelineServices.map((service) => (
          <ListItem
            key={service.id}
            divider
            disablePadding
            sx={{ py: 1.5 }}
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
              primary={service.name}
              secondary={
                <Stack spacing={1} mt={1}>
                  <LinearProgress
                    variant="determinate"
                    value={service.health}
                    sx={{
                      height: 8,
                      borderRadius: 10,
                    }}
                  />

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Health: {service.health}%
                  </Typography>
                </Stack>
              }
            />

            <Chip
              label={service.status}
              color="success"
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default PipelineStatus;