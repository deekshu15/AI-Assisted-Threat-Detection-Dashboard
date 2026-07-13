import {
  SecurityEvent,
  SecuritySource,
} from "../types/security";

export const securitySources: SecuritySource[] = [
  {
    id: 1,
    name: "Windows Event Logs",
    type: "Windows",
    eventsToday: 284532,
    health: 98,
    status: "Healthy",
  },
  {
    id: 2,
    name: "Linux Syslog",
    type: "Linux",
    eventsToday: 178421,
    health: 96,
    status: "Healthy",
  },
  {
    id: 3,
    name: "AWS Network Firewall",
    type: "Firewall",
    eventsToday: 90523,
    health: 92,
    status: "Healthy",
  },
  {
    id: 4,
    name: "IDS / IPS",
    type: "Network",
    eventsToday: 52312,
    health: 88,
    status: "Warning",
  },
  {
    id: 5,
    name: "Authentication Service",
    type: "Authentication",
    eventsToday: 74221,
    health: 95,
    status: "Healthy",
  },
];

export const securityEvents: SecurityEvent[] = [
  {
    id: 1,
    source: "Windows Event Logs",
    message: "4625 Failed Login",
    severity: "Critical",
    timestamp: "2 min ago",
  },
  {
    id: 2,
    source: "Firewall",
    message: "Port Scan Detected",
    severity: "High",
    timestamp: "7 min ago",
  },
  {
    id: 3,
    source: "Linux",
    message: "SSH Authentication Failure",
    severity: "Medium",
    timestamp: "11 min ago",
  },
  {
    id: 4,
    source: "Threat Feed",
    message: "New IOC Downloaded",
    severity: "Low",
    timestamp: "24 min ago",
  },
];