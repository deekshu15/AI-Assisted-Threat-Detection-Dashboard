import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";

import {
  Avatar,
  Box,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";

function RiskScore() {
  const score = 92;

  return (
    <DashboardWidget
      title="Risk Score"
      subtitle="Overall AI risk assessment"
      height={450}
    >
      <Stack
        spacing={5}
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Avatar
          sx={{
            width: 90,
            height: 90,
            bgcolor: "#E0F2FE",
            color: "#1D4ED8",
          }}
        >
          <SecurityRoundedIcon sx={{ fontSize: 46 }} />
        </Avatar>

        <Box width="100%">
          <Typography
            variant="h2"
            align="center"
            fontWeight={700}
          >
            {score}
          </Typography>

          <Typography
            align="center"
            color="text.secondary"
            mb={3}
          >
            High Risk
          </Typography>

          <LinearProgress
            variant="determinate"
            value={score}
            sx={{
              height: 12,
              borderRadius: 10,
            }}
          />
        </Box>
      </Stack>
    </DashboardWidget>
  );
}

export default RiskScore;