import { useEffect, useState } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CircularProgress } from "@mui/material";

import { DashboardWidget } from "../../../components/ui/DashboardWidget";

import siemService from "../services/siemService";
import { SeverityStatistic } from "../types/siem";

function SeverityChart() {
  const [data, setData] = useState<SeverityStatistic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    siemService
      .getSeverity()
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <DashboardWidget
      title="Event Severity"
      subtitle="Events grouped by severity (log scale)"
      height={420}
    >
      {loading ? (
        <CircularProgress size={24} />
      ) : (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="severity" />
          <YAxis scale="log" domain={[1, "auto"]} allowDataOverflow />
          <Tooltip />
          <Bar dataKey="count" fill="#1D4ED8" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      )}
    </DashboardWidget>
  );
}

export default SeverityChart;