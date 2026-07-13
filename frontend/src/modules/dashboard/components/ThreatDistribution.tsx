import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";

const distribution = [
  {
    name: "Malware",
    value: 34,
  },
  {
    name: "Brute Force",
    value: 21,
  },
  {
    name: "Phishing",
    value: 17,
  },
  {
    name: "DDoS",
    value: 15,
  },
  {
    name: "Insider",
    value: 13,
  },
];

const COLORS = [
  "#1D4ED8",
  "#0EA5E9",
  "#60A5FA",
  "#F59E0B",
  "#DC2626",
];

function ThreatDistribution() {
  return (
    <DashboardWidget
      title="Threat Distribution"
      subtitle="Detected attack categories"
      height={380}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <PieChart>
          <Pie
            data={distribution}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
          >
            {distribution.map((_, index) => (
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

export default ThreatDistribution;