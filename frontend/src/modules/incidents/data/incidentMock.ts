import {
  Analyst,
  Evidence,
  Incident,
} from "../types/incident";

export const incidents: Incident[] = [
  {
    id: 1,
    title: "Windows Brute Force Attack",
    severity: "Critical",
    status: "Investigating",
    assignedTo: "Alice Johnson",
    createdAt: "09:15",
  },
  {
    id: 2,
    title: "PowerShell Abuse",
    severity: "High",
    status: "Open",
    assignedTo: "David Miller",
    createdAt: "10:32",
  },
  {
    id: 3,
    title: "Firewall Port Scan",
    severity: "Medium",
    status: "Contained",
    assignedTo: "Emma Wilson",
    createdAt: "11:04",
  },
];

export const evidenceTimeline: Evidence[] = [
  {
    id: 1,
    time: "09:16",
    description: "4625 Login Failures Detected",
  },
  {
    id: 2,
    time: "09:19",
    description: "Isolation Forest Prediction Generated",
  },
  {
    id: 3,
    time: "09:21",
    description: "Incident Created",
  },
];

export const analysts: Analyst[] = [
  {
    id: 1,
    name: "Alice Johnson",
    incidents: 7,
  },
  {
    id: 2,
    name: "David Miller",
    incidents: 5,
  },
  {
    id: 3,
    name: "Emma Wilson",
    incidents: 3,
  },
];