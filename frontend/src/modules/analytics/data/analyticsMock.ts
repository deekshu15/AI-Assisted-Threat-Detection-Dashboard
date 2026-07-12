import {
  ThreatTrendPoint,
  ModelMetric,
} from "../types/analytics";

export const threatTrend: ThreatTrendPoint[] = [
  { month: "Jan", threats: 120 },
  { month: "Feb", threats: 180 },
  { month: "Mar", threats: 145 },
  { month: "Apr", threats: 260 },
  { month: "May", threats: 220 },
  { month: "Jun", threats: 310 },
];

export const modelMetrics: ModelMetric[] = [
  {
    model: "Isolation Forest",
    precision: 95,
    recall: 91,
    f1Score: 93,
  },
  {
    model: "Random Forest",
    precision: 97,
    recall: 95,
    f1Score: 96,
  },
  {
    model: "XGBoost",
    precision: 98,
    recall: 97,
    f1Score: 98,
  },
];