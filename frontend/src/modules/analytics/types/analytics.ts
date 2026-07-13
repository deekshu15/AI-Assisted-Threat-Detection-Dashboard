export interface ExecutiveMetric {
  title: string;
  value: string;
  trend: number;
}

export interface ThreatTrendData {
  month: string;
  threats: number;
}

export interface RiskTrendData {
  month: string;
  risk: number;
}

export interface AttackCategory {
  category: string;
  count: number;
}

export interface SourceAnalysis {
  source: string;
  events: number;
}

export interface ModelPerformance {
  model: string;
  accuracy: number;
}

export interface MitreCoverage {
  tactic: string;
  coverage: number;
}