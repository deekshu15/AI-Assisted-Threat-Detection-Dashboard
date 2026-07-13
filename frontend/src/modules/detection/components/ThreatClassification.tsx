import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";

const data = [
  {
    name: "Malware",
    value: 32,
  },
  {
    name: "Brute Force",
    value: 24,
  },
  {
    name: "Privilege Escalation",
    value: 18,
  },
  {
    name: "Phishing",
    value: 15,
  },
  {
    name: "Other",
    value: 11,
  },
];

const COLORS = [
  "#1D4ED8",
  "#0EA5E9",
  "#60A5FA",
  "#F59E0B",
  "#DC2626",
];

function ThreatClassification() {
  return (
    <DashboardWidget
      title="Threat Classification"
      subtitle="Detected attack categories"
      height={450}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
          >
            {data.map((_, index) => (
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

export default ThreatClassification;