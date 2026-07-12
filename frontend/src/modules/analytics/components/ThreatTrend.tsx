import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import DashboardWidget from "../../dashboard/components/DashboardWidget";

import { AnalyticsService } from "../services/analyticsService";

function ThreatTrend() {
  const data = AnalyticsService.getThreatTrend();

  return (
    <DashboardWidget title="Threat Trend">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            dataKey="threats"
            stroke="#2563EB"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </DashboardWidget>
  );
}

export default ThreatTrend;