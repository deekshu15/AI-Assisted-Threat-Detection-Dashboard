import { Typography } from "@mui/material";

import { DashboardCard } from "../../../components/ui/card";

import AlertsTable from "../../../components/tables/AlertsTable";

import { DashboardService } from "../services/dashboardService";

function RecentAlerts() {

  const alerts =
    DashboardService.getRecentAlerts();

  return (

    <DashboardCard>

      <Typography
        variant="h6"
        mb={2}
      >
        Recent Alerts
      </Typography>

      <AlertsTable alerts={alerts} />

    </DashboardCard>

  );

}

export default RecentAlerts;