import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";

const timelineData = [
  { time: "00:00", attacks: 12 },
  { time: "04:00", attacks: 28 },
  { time: "08:00", attacks: 65 },
  { time: "12:00", attacks: 91 },
  { time: "16:00", attacks: 74 },
  { time: "20:00", attacks: 53 },
  { time: "24:00", attacks: 37 },
];

function ThreatTimeline() {
  return (
    <DashboardWidget
      title="Threat Timeline"
      subtitle="Threats detected during the last 24 hours"
      height={380}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <AreaChart data={timelineData}>
          <defs>
            <linearGradient
              id="timelineGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#1D4ED8"
                stopOpacity={0.35}
              />

              <stop
                offset="100%"
                stopColor="#1D4ED8"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E2E8F0"
          />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="attacks"
            stroke="#1D4ED8"
            strokeWidth={3}
            fill="url(#timelineGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </DashboardWidget>
  );
}

export default ThreatTimeline;