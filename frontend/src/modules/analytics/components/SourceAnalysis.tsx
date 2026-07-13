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

import { sourceAnalysis } from "../data/analyticsMock";

function SourceAnalysis() {
  return (
    <DashboardWidget
      title="Log Source Analysis"
      subtitle="Events by source"
      height={430}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart data={sourceAnalysis}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="source" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="events"
            fill="#0284C7"
          />
        </BarChart>
      </ResponsiveContainer>
    </DashboardWidget>
  );
}

export default SourceAnalysis;