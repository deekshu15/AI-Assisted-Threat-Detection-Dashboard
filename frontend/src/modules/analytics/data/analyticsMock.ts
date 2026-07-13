import {
  AttackCategory,
  ExecutiveMetric,
  MitreCoverage,
  ModelPerformance,
  RiskTrendData,
  SourceAnalysis,
  ThreatTrendData,
} from "../types/analytics";

export const executiveMetrics: ExecutiveMetric[] = [
  {
    title: "Threats Blocked",
    value: "18,420",
    trend: 12,
  },
  {
    title: "Critical Alerts",
    value: "118",
    trend: -5,
  },
  {
    title: "Detection Accuracy",
    value: "98.8%",
    trend: 2,
  },
  {
    title: "Mean Response",
    value: "11 min",
    trend: -7,
  },
];

export const threatTrend: ThreatTrendData[] = [
  { month: "Jan", threats: 220 },
  { month: "Feb", threats: 260 },
  { month: "Mar", threats: 310 },
  { month: "Apr", threats: 390 },
  { month: "May", threats: 460 },
  { month: "Jun", threats: 510 },
];

export const riskTrend: RiskTrendData[] = [
  { month: "Jan", risk: 24 },
  { month: "Feb", risk: 29 },
  { month: "Mar", risk: 33 },
  { month: "Apr", risk: 42 },
  { month: "May", risk: 37 },
  { month: "Jun", risk: 31 },
];

export const attackCategories: AttackCategory[] = [
  { category: "Brute Force", count: 41 },
  { category: "Malware", count: 24 },
  { category: "Phishing", count: 18 },
  { category: "Ransomware", count: 11 },
  { category: "Other", count: 6 },
];

export const sourceAnalysis: SourceAnalysis[] = [
  { source: "Windows", events: 820 },
  { source: "Linux", events: 610 },
  { source: "Firewall", events: 540 },
  { source: "Authentication", events: 430 },
];

export const modelPerformance: ModelPerformance[] = [
  {
    model: "Isolation Forest",
    accuracy: 98.6,
  },
  {
    model: "Random Forest",
    accuracy: 97.8,
  },
  {
    model: "XGBoost",
    accuracy: 99.2,
  },
];

export const mitreCoverage: MitreCoverage[] = [
  {
    tactic: "Execution",
    coverage: 91,
  },
  {
    tactic: "Credential Access",
    coverage: 97,
  },
  {
    tactic: "Persistence",
    coverage: 88,
  },
  {
    tactic: "Discovery",
    coverage: 84,
  },
];