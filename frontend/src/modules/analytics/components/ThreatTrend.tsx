import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { DashboardWidget } from "../../../components/ui/DashboardWidget";

import { threatTrend } from "../data/analyticsMock";

function ThreatTrend() {
  return (
    <DashboardWidget
      title="Threat Trend"
      subtitle="Detected threats over time"
      height={430}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <AreaChart data={threatTrend}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="threats"
            stroke="#1D4ED8"
            fill="#BFDBFE"
          />
        </AreaChart>
      </ResponsiveContainer>
    </DashboardWidget>
  );
}

export default ThreatTrend;