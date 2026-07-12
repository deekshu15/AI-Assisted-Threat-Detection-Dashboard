import {
  Stack,
  Typography,
  Chip,
  Divider,
} from "@mui/material";

import DashboardWidget from "./DashboardWidget";

const insights = [
  {
    title: "Critical Risk",
    message: "Multiple brute-force login attempts detected.",
    severity: "High",
  },
  {
    title: "Recommendation",
    message: "Block suspicious IP addresses using the firewall.",
    severity: "Medium",
  },
  {
    title: "Prediction",
    message: "Probability of lateral movement: 84%",
    severity: "High",
  },
];

function AIInsights() {
  return (
    <DashboardWidget title="AI Security Assistant">
      <Stack spacing={2}>
        {insights.map((item, index) => (
          <div key={index}>
            <Stack
              direction="row"
              justifyContent="space-between"
              mb={1}
            >
              <Typography fontWeight={600}>
                {item.title}
              </Typography>

              <Chip
                label={item.severity}
                color={
                  item.severity === "High"
                    ? "error"
                    : "warning"
                }
                size="small"
              />
            </Stack>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {item.message}
            </Typography>

            {index < insights.length - 1 && (
              <Divider sx={{ mt: 2 }} />
            )}
          </div>
        ))}
      </Stack>
    </DashboardWidget>
  );
}

export default AIInsights;