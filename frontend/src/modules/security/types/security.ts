export type SourceStatus =
  | "Healthy"
  | "Warning"
  | "Critical"
  | "Offline";

export interface SecuritySource {
  id: number;
  name: string;
  type: string;
  eventsToday: number;
  health: number;
  status: SourceStatus;
}

export interface SecurityEvent {
  id: number;
  source: string;
  message: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  timestamp: string;
}