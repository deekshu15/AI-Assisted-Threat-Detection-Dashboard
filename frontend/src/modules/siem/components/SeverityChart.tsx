import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { DashboardWidget } from "../../../components/ui/DashboardWidget";

import { severityStatistics } from "../data/siemMock";

function SeverityChart() {
  return (
    <DashboardWidget
      title="Event Severity"
      subtitle="Events grouped by severity"
      height={420}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart data={severityStatistics}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="severity" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#1D4ED8"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </DashboardWidget>
  );
}

export default SeverityChart;