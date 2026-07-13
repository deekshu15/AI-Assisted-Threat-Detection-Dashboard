export type IncidentSeverity =
  | "Critical"
  | "High"
  | "Medium"
  | "Low";

export type IncidentStatus =
  | "Open"
  | "Investigating"
  | "Contained"
  | "Resolved";

export interface Incident {
  id: number;
  title: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  assignedTo: string;
  createdAt: string;
}

export interface Evidence {
  id: number;
  time: string;
  description: string;
}

export interface Analyst {
  id: number;
  name: string;
  incidents: number;
}