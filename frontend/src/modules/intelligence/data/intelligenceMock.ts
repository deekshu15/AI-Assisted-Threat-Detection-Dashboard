import {
  CVE,
  IOC,
  MalwareFamily,
  ThreatFeed,
} from "../types/intelligence";

export const latestCVEs: CVE[] = [
  {
    id: "CVE-2026-1245",
    severity: "Critical",
    description: "Remote Code Execution vulnerability",
    published: "Today",
  },
  {
    id: "CVE-2026-1187",
    severity: "High",
    description: "Privilege Escalation",
    published: "Yesterday",
  },
  {
    id: "CVE-2026-1032",
    severity: "Medium",
    description: "Information Disclosure",
    published: "2 days ago",
  },
];

export const iocs: IOC[] = [
  {
    id: 1,
    type: "IP",
    value: "192.168.20.45",
    confidence: 98,
  },
  {
    id: 2,
    type: "Domain",
    value: "evil-login.example",
    confidence: 95,
  },
  {
    id: 3,
    type: "Hash",
    value: "F4A2BC9812...",
    confidence: 92,
  },
];

export const malwareFamilies: MalwareFamily[] = [
  {
    id: 1,
    name: "Emotet",
    severity: "Critical",
    affectedSystems: 41,
  },
  {
    id: 2,
    name: "LockBit",
    severity: "High",
    affectedSystems: 18,
  },
  {
    id: 3,
    name: "QakBot",
    severity: "Medium",
    affectedSystems: 9,
  },
];

export const threatFeeds: ThreatFeed[] = [
  {
    id: 1,
    provider: "AlienVault OTX",
    status: "Connected",
    lastUpdated: "5 min ago",
  },
  {
    id: 2,
    provider: "MITRE ATT&CK",
    status: "Connected",
    lastUpdated: "12 min ago",
  },
  {
    id: 3,
    provider: "CISA",
    status: "Connected",
    lastUpdated: "18 min ago",
  },
];