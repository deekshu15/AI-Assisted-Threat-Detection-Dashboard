import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Typography } from "@mui/material";

import { DashboardCard } from "../../../components/ui/card";

import { DashboardService } from "../services/dashboardService";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

function ThreatDistribution() {
  const data = DashboardService.getThreatDistribution();

  return (
    <DashboardCard>
      <Typography variant="h6" mb={2}>
        Threat Distribution
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={90}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </DashboardCard>
  );
}

export default ThreatDistribution;