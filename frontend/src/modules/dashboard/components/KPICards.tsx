import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import { DashboardService } from "../services/dashboardService";

function KPICards() {

  const stats = DashboardService.getStats();

  const cards = [
    {
      title: "Total Logs",
      value: stats.totalLogs.toLocaleString(),
    },
    {
      title: "Threats",
      value: stats.threats,
    },
    {
      title: "Risk Score",
      value: `${stats.riskScore}%`,
    },
    {
      title: "Active Alerts",
      value: stats.activeAlerts,
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.title}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">
                {card.title}
              </Typography>

              <Typography variant="h4" sx={{ mt: 2 }}>
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default KPICards;