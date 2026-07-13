import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { DashboardWidget } from "../../../components/ui/DashboardWidget";
import { riskTrend } from "../data/analyticsMock";

function RiskTrend() {
  return (
    <DashboardWidget
      title="Risk Trend"
      subtitle="Organizational cyber risk over time"
      height={430}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={riskTrend}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            dataKey="risk"
            stroke="#DC2626"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </DashboardWidget>
  );
}

export default RiskTrend;