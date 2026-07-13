import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

import {
  Box,
  Stack,
  Typography,
} from "@mui/material";

import DashboardCard from "../Card/DashboardCard";

interface StatusCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  icon?: React.ReactNode;
  color?: string;
}

function StatusCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  color = "#1D4ED8",
}: StatusCardProps) {
  const TrendIcon =
    trend === undefined
      ? TrendingFlatRoundedIcon
      : trend > 0
      ? TrendingUpRoundedIcon
      : TrendingDownRoundedIcon;

  const trendColor =
    trend === undefined
      ? "text.secondary"
      : trend >= 0
      ? "success.main"
      : "error.main";

  return (
    <DashboardCard>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {title}
          </Typography>

          <Typography
            variant="h3"
            fontWeight={700}
            mt={1}
          >
            {value}
          </Typography>

          {subtitle && (
            <Typography
              mt={1}
              variant="body2"
              color="text.secondary"
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 3,
            bgcolor: `${color}15`,
            color,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </Box>
      </Stack>

      {trend !== undefined && (
        <Stack
          mt={3}
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <TrendIcon
            sx={{
              color: trendColor,
              fontSize: 18,
            }}
          />

          <Typography
            variant="body2"
            color={trendColor}
            fontWeight={600}
          >
            {trend > 0 ? "+" : ""}
            {trend}%
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            compared to yesterday
          </Typography>
        </Stack>
      )}
    </DashboardCard>
  );
}

export default StatusCard;