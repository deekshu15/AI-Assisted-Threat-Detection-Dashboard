import {
  ActiveSession,
  CorrelationRule,
  SeverityStatistic,
  SIEMEvent,
} from "../types/siem";

export const liveEvents: SIEMEvent[] = [
  {
    id: 1,
    timestamp: "12:01",
    source: "Windows",
    severity: "Critical",
    message: "Brute Force Login",
  },
  {
    id: 2,
    timestamp: "12:03",
    source: "Firewall",
    severity: "High",
    message: "Port Scan",
  },
  {
    id: 3,
    timestamp: "12:05",
    source: "Linux",
    severity: "Medium",
    message: "SSH Failure",
  },
];

export const correlationRules: CorrelationRule[] = [
  {
    id: 1,
    name: "Multiple Failed Logins",
    matches: 52,
    enabled: true,
  },
  {
    id: 2,
    name: "PowerShell Abuse",
    matches: 13,
    enabled: true,
  },
  {
    id: 3,
    name: "Privilege Escalation",
    matches: 8,
    enabled: true,
  },
];

export const activeSessions: ActiveSession[] = [
  {
    id: 1,
    username: "Administrator",
    ipAddress: "192.168.1.21",
    status: "Active",
  },
  {
    id: 2,
    username: "john.smith",
    ipAddress: "10.0.2.15",
    status: "Suspicious",
  },
];

export const severityStatistics: SeverityStatistic[] = [
  {
    severity: "Critical",
    count: 28,
  },
  {
    severity: "High",
    count: 61,
  },
  {
    severity: "Medium",
    count: 84,
  },
  {
    severity: "Low",
    count: 42,
  },
];