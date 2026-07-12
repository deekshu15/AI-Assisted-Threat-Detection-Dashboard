import { Incident } from "../types/incident";

export const incidents: Incident[] = [
  {
    id: 1,
    title: "Brute Force Login",
    severity: "Critical",
    source: "Windows",
    assignedTo: "SOC Analyst",
    status: "Investigating",
    createdAt: "10:25 AM",
  },
  {
    id: 2,
    title: "DDoS Attack",
    severity: "Critical",
    source: "IDS",
    assignedTo: "Network Team",
    status: "Open",
    createdAt: "10:40 AM",
  },
  {
    id: 3,
    title: "Port Scan",
    severity: "High",
    source: "Firewall",
    assignedTo: "SOC Analyst",
    status: "Resolved",
    createdAt: "09:50 AM",
  },
];