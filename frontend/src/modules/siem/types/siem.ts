export interface SIEMEvent {
  id: number;
  timestamp: string;
  source: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  message: string;
}

export interface CorrelationRule {
  id: number;
  name: string;
  matches: number;
  enabled: boolean;
}

export interface ActiveSession {
  id: number;
  username: string;
  ipAddress: string;
  status: "Active" | "Suspicious";
}

export interface SeverityStatistic {
  severity: string;
  count: number;
}