import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { Typography } from "@mui/material";

import { DashboardCard } from "../../../components/ui/card";

import { DashboardService } from "../services/dashboardService";

function ThreatTimeline() {
  const data = DashboardService.getThreatTimeline();

  return (
    <DashboardCard>
      <Typography variant="h6" mb={2}>
        Threat Timeline
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="threats"
            stroke="#3B82F6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </DashboardCard>
  );
}

export default ThreatTimeline;