export interface CVE {
  id: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  description: string;
  published: string;
}

export interface IOC {
  id: number;
  type: "IP" | "Domain" | "Hash" | "URL";
  value: string;
  confidence: number;
}

export interface MalwareFamily {
  id: number;
  name: string;
  severity: "Critical" | "High" | "Medium";
  affectedSystems: number;
}

export interface ThreatFeed {
  id: number;
  provider: string;
  status: "Connected" | "Disconnected";
  lastUpdated: string;
}