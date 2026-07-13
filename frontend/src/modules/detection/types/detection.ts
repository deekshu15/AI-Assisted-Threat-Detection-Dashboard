export type ModelState =
  | "Online"
  | "Training"
  | "Offline";

export interface AIModel {
  id: number;
  name: string;
  algorithm: string;
  accuracy: number;
  status: ModelState;
  version: string;
}

export interface PredictionSummary {
  threatsDetected: number;
  anomalies: number;
  falsePositives: number;
  confidence: number;
}

export interface ThreatPrediction {
  id: number;
  timestamp: string;
  source: string;
  prediction: string;
  confidence: number;
  severity: "Low" | "Medium" | "High" | "Critical";
}