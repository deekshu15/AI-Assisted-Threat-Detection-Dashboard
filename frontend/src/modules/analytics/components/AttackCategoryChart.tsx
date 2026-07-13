import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { DashboardWidget } from "../../../components/ui/DashboardWidget";

import { attackCategories } from "../data/analyticsMock";

const COLORS = [
  "#1D4ED8",
  "#2563EB",
  "#38BDF8",
  "#F59E0B",
  "#DC2626",
];

function AttackCategoryChart() {
  return (
    <DashboardWidget
      title="Attack Categories"
      subtitle="Distribution of detected attacks"
      height={430}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <PieChart>
          <Pie
            data={attackCategories}
            dataKey="count"
            nameKey="category"
            outerRadius={120}
          >
            {attackCategories.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </DashboardWidget>
  );
}

export default AttackCategoryChart;