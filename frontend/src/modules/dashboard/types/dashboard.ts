export interface DashboardStats {
  totalLogs: number;
  threats: number;
  riskScore: number;
  activeAlerts: number;
}

export interface SecuritySourceStatus {
  source: string;
  status: "Online" | "Offline";
  events: number;
}