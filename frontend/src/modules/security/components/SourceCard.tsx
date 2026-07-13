import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import {
  Avatar,
  Box,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import { SecuritySource } from "../types/security";

interface Props {
  source: SecuritySource;
}

function SourceCard({ source }: Props) {
  const getStatusColor = () => {
    switch (source.status) {
      case "Healthy":
        return "success";

      case "Warning":
        return "warning";

      case "Critical":
        return "error";

      default:
        return "default";
    }
  };

  const getStatusIcon = () => {
    switch (source.status) {
      case "Healthy":
        return <CheckCircleRoundedIcon />;

      case "Warning":
        return <WarningAmberRoundedIcon />;

      case "Critical":
        return <ErrorRoundedIcon />;

      default:
        return <CheckCircleRoundedIcon />;
    }
  };

  return (
    <DashboardWidget
      title={source.name}
      subtitle={source.type}
      height={260}
    >
      <Stack spacing={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Avatar
            sx={{
              bgcolor: "#E0F2FE",
              color: "#0284C7",
              width: 56,
              height: 56,
            }}
          >
            {getStatusIcon()}
          </Avatar>

          <Chip
            label={source.status}
            color={getStatusColor()}
          />
        </Stack>

        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Events Today
          </Typography>

          <Typography
            variant="h4"
            fontWeight={700}
          >
            {source.eventsToday.toLocaleString()}
          </Typography>
        </Box>

        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            mb={1}
          >
            <Typography variant="body2">
              Source Health
            </Typography>

            <Typography
              color="primary"
              fontWeight={600}
            >
              {source.health}%
            </Typography>
          </Stack>

          <LinearProgress
            variant="determinate"
            value={source.health}
            sx={{
              height: 8,
              borderRadius: 8,
            }}
          />
        </Box>
      </Stack>
    </DashboardWidget>
  );
}

export default SourceCard;