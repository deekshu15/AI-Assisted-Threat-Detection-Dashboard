export interface Threat {
  id: string;
  timestamp: string; // ISO or human-readable (e.g., 2026-07-18 14:32:05)
  sourceIp: string;
  country: string;
  attackType: string; // DDoS, Ransomware, Brute Force, SQL Injection, Phishing, Zero-Day, XSS
  targetDevice: string; // Router, IoT Device, Firewall, Mail Server, Workstation, Database Server, Web Server
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Blocked' | 'Investigating' | 'Allowed' | 'Mitigated';
  bytesTransferred: number;
  port: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  ipReport?: IPIntelligence;
}

export interface IPIntelligence {
  ip: string;
  geolocation: string;
  isp: string;
  threatLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  securityContext: string;
  associatedAttacks: number;
  lastSeen: string;
}

export type ViewType = 'Dashboard' | 'Analytics' | 'AI Summary' | 'AI Recs';

export type SidebarToolType = 
  | 'Static Data' 
  | 'Live API' 
  | 'REST API' 
  | 'Image Scan' 
  | 'Barcode' 
  | 'Nmap' 
  | 'Statistics' 
  | 'Settings'
  | 'Cyber AI Agent'
  | 'API Keys'
  | 'AI Summary'
  | 'AI Recs'
  | 'OpenVAS'
  | 'Nikto'
  | 'Metasploit Framework'
  | 'SQLmap'
  | 'John the Ripper'
  | 'OWASP ZAP'
  | 'Wapiti'
  | 'Wazuh'
  | 'Snort'
  | 'Autopsy'
  | 'Volatility';
