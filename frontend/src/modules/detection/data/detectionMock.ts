import {
  AIModel,
  PredictionSummary,
  ThreatPrediction,
} from "../types/detection";

export const models: AIModel[] = [
  {
    id: 1,
    name: "Isolation Forest",
    algorithm: "Unsupervised",
    accuracy: 98.6,
    status: "Online",
    version: "v2.3",
  },
  {
    id: 2,
    name: "Random Forest",
    algorithm: "Classification",
    accuracy: 97.4,
    status: "Online",
    version: "v3.1",
  },
  {
    id: 3,
    name: "XGBoost",
    algorithm: "Gradient Boosting",
    accuracy: 99.1,
    status: "Online",
    version: "v4.0",
  },
];

export const predictionSummary: PredictionSummary = {
  threatsDetected: 1248,
  anomalies: 318,
  falsePositives: 14,
  confidence: 98,
};

export const predictionHistory: ThreatPrediction[] = [
  {
    id: 1,
    timestamp: "11:42",
    source: "Windows Logs",
    prediction: "Brute Force",
    confidence: 99,
    severity: "Critical",
  },
  {
    id: 2,
    timestamp: "11:45",
    source: "Firewall",
    prediction: "Port Scan",
    confidence: 94,
    severity: "High",
  },
  {
    id: 3,
    timestamp: "11:49",
    source: "Linux",
    prediction: "Privilege Escalation",
    confidence: 91,
    severity: "High",
  },
];