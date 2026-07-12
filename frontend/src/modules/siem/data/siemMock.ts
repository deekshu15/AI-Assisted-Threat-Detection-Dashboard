import { SecurityEvent } from "../types/siem";

export const events: SecurityEvent[] = [
  {
    id: 1,
    timestamp: "10:05:22",
    source: "Windows",
    severity: "Critical",
    event: "Brute Force Login",
    status: "Open",
  },
  {
    id: 2,
    timestamp: "10:07:11",
    source: "Firewall",
    severity: "High",
    event: "Port Scan",
    status: "Investigating",
  },
  {
    id: 3,
    timestamp: "10:08:52",
    source: "IDS",
    severity: "Critical",
    event: "DDoS Attack",
    status: "Open",
  },
  {
    id: 4,
    timestamp: "10:10:03",
    source: "Linux",
    severity: "Medium",
    event: "Privilege Escalation",
    status: "Resolved",
  },
];