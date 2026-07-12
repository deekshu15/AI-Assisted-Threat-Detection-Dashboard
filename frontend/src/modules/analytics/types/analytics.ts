export interface ThreatTrendPoint {
  month: string;
  threats: number;
}

export interface ModelMetric {
  model: string;
  precision: number;
  recall: number;
  f1Score: number;
}