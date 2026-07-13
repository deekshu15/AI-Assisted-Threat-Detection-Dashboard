import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";

import { streamMetrics } from "../data/ingestionMock";

function StreamStatus() {
  return (
    <DashboardWidget
      title="Event Stream"
      subtitle="Events processed per hour"
      height={420}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <LineChart data={streamMetrics}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E2E8F0"
          />

          <XAxis dataKey="timestamp" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="events"
            stroke="#1D4ED8"
            strokeWidth={3}
            dot={{
              r: 4,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </DashboardWidget>
  );
}

export default StreamStatus;