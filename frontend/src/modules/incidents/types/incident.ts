export interface Incident {
  id: number;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  source: string;
  assignedTo: string;
  status: "Open" | "Investigating" | "Resolved";
  createdAt: string;
}