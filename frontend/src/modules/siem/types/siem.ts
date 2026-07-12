export interface SecurityEvent {
  id: number;
  timestamp: string;
  source: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  event: string;
  status: "Open" | "Investigating" | "Resolved";
}