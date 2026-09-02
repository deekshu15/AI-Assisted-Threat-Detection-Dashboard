import { Threat, IPIntelligence } from './types';

export const COUNTRIES = [
  'United Kingdom', 'Australia', 'South Korea', 'India', 'Iran', 'Germany', 
  'Brazil', 'Japan', 'Russia', 'China', 'United States', 'Nigeria'
];

export const ATTACK_TYPES = [
  'DDoS', 'Ransomware', 'Brute Force', 'SQL Injection', 'Phishing', 'Zero-Day', 'XSS'
];

export const TARGET_DEVICES = [
  'Router', 'IoT Device', 'Firewall', 'Mail Server', 'Workstation', 'Database Server', 'Web Server'
];

export const IPS = [
  '192.168.1.51', '185.220.101.5', '103.241.22.9', '45.143.203.14', '198.51.100.72',
  '91.240.118.53', '141.98.10.22', '193.201.224.11', '80.82.77.33', '109.236.80.91'
];

export function generateMockThreats(count: number = 120): Threat[] {
  const threats: Threat[] = [];
  const start = new Date();
  
  for (let i = 0; i < count; i++) {
    const timeOffset = Math.floor(Math.random() * 24 * 60 * 60 * 1000); // within last 24 hours
    const threatTime = new Date(start.getTime() - timeOffset);
    const hour = threatTime.getHours().toString().padStart(2, '0');
    const min = threatTime.getMinutes().toString().padStart(2, '0');
    const sec = threatTime.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${threatTime.getFullYear()}-${(threatTime.getMonth() + 1).toString().padStart(2, '0')}-${threatTime.getDate().toString().padStart(2, '0')} ${hour}:${min}:${sec}`;

    const attackType = ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)];
    const countryIndex = Math.random() < 0.4 ? 10 : Math.floor(Math.random() * COUNTRIES.length); // bias towards US or select randomly
    const country = COUNTRIES[countryIndex];
    const targetDevice = TARGET_DEVICES[Math.floor(Math.random() * TARGET_DEVICES.length)];
    const sourceIp = i % 15 === 0 ? '192.168.1.51' : IPS[Math.floor(Math.random() * IPS.length)];

    let severity: 'Low' | 'Medium' | 'High' | 'Critical' = 'Low';
    if (attackType === 'Zero-Day' || attackType === 'Ransomware') {
      severity = Math.random() < 0.7 ? 'Critical' : 'High';
    } else if (attackType === 'SQL Injection' || attackType === 'DDoS') {
      severity = Math.random() < 0.6 ? 'High' : 'Medium';
    } else if (attackType === 'Brute Force' || attackType === 'Phishing') {
      severity = Math.random() < 0.5 ? 'Medium' : 'Low';
    } else {
      severity = 'Low';
    }

    let status: 'Blocked' | 'Investigating' | 'Allowed' | 'Mitigated' = 'Blocked';
    if (severity === 'Critical') {
      status = Math.random() < 0.8 ? 'Blocked' : 'Investigating';
    } else if (severity === 'High') {
      status = Math.random() < 0.7 ? 'Blocked' : 'Mitigated';
    } else {
      status = Math.random() < 0.5 ? 'Blocked' : 'Allowed';
    }

    threats.push({
      id: `TR-${10000 + i}`,
      timestamp: formattedTime,
      sourceIp,
      country,
      attackType,
      targetDevice,
      severity,
      status,
      bytesTransferred: Math.floor(Math.random() * 1500000) + 120,
      port: [22, 80, 443, 3306, 8080, 23, 445][Math.floor(Math.random() * 7)]
    });
  }

  // Sort by newest timestamp
  return threats.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

export const PRESET_IP_INTELLIGENCE: Record<string, IPIntelligence> = {
  '192.168.1.51': {
    ip: '192.168.1.51',
    geolocation: 'Internal Network (LAN) - Subnet B',
    isp: 'Local Corporate Intranet (HQ)',
    threatLevel: 'Critical',
    securityContext: 'Host exhibiting lateral movement patterns, high volume SSH brute force attempts on the database server, and potential data exfiltration over secure sockets.',
    associatedAttacks: 18,
    lastSeen: '2026-07-18 23:05:12'
  },
  '185.220.101.5': {
    ip: '185.220.101.5',
    geolocation: 'Germany, Frankfurt (Tor Exit Node)',
    isp: 'M247 Europe Ltd',
    threatLevel: 'High',
    securityContext: 'Known Tor Exit router actively used in automated vulnerability scanning campaigns and brute-forcing WordPress endpoints.',
    associatedAttacks: 34,
    lastSeen: '2026-07-18 22:58:34'
  },
  '103.241.22.9': {
    ip: '103.241.22.9',
    geolocation: 'South Korea, Seoul',
    isp: 'SK Broadband Co Ltd',
    threatLevel: 'High',
    securityContext: 'Involved in high-rate DDoS amplification targeting critical routers. Over 240,000 packets/sec originating from this IP.',
    associatedAttacks: 41,
    lastSeen: '2026-07-18 21:14:02'
  },
  '45.143.203.14': {
    ip: '45.143.203.14',
    geolocation: 'Russia, Moscow',
    isp: 'VDSina Hosting',
    threatLevel: 'Critical',
    securityContext: 'Command and Control (C2) server delivering payload variants of Ransomware-as-a-Service (RaaS) on unpatched workstations.',
    associatedAttacks: 12,
    lastSeen: '2026-07-18 23:12:00'
  }
};

export const DEFAULT_AI_SUMMARY = `### Executive Summary of Cyber Threat Intelligence

Our cyber threat intelligence core has compiled an executive analysis of **70 active cyber threats** currently active across critical enterprise network subnets. Threat vectors have been fully cross-referenced against active signature databases.

---

### 1. Overall Threat Landscape Assessment

Based on real-time security telemetry buffers, the active threat landscape is diagnosed as **moderately active and diverse**. Multiple threat actors are attempting coordinated scanning, credential stuffing, and payload injection, demanding proactive defensive controls.

---

### 2. Prevalent Attack Types and Their Frequency

Analysis of the active threat events shows the following breakdown of attack methods and frequencies:
- **Phishing:** ~24.3% (17 out of 70 threats)
- **SQL Injection:** ~18.6% (13 out of 70 threats)
- **Ransomware:** ~14.3% (10 out of 70 threats)
- **Brute Force:** ~11.4% (8 out of 70 threats)
- **Zero-Day Exploit:** ~10% (7 out of 70 threats)
- **DDoS:** ~7.1% (5 out of 70 threats)
- **Man-in-the-Middle:** ~7.1% (5 out of 70 threats)
- **XSS:** ~7.1% (5 out of 70 threats)

---

### 3. Top Attacking Countries and Target Countries

Geographic tracing maps highlight the following concentration metrics of originating traffic:
- **India:** ~15.7% (11 out of 70 threats)
- **China:** ~11.4% (8 out of 70 threats)
- **United States:** ~10% (7 out of 70 threats)
- **Other Regions:** The remaining percentage points are distributed evenly among global edge routers.`;

export const DEFAULT_AI_RECS = [
  {
    category: 'Network Security (DDoS & Brute Force)',
    threats: ['DDoS', 'Brute Force'],
    priority: 'High',
    playbook: 'DDoS Mitigations and Brute-Force Rate Limiting',
    steps: [
      'Enable SYN-cookie protection and rate-limiting at the edge Firewall.',
      'Configure fail2ban or a similar intrusion prevention system (IPS) on SSH ports (blocking IPs after 3 failed login attempts).',
      'Deploy Cloudflare Magic Transit or standard BGP routing redirects to scrub high-volume UDP amplification vectors.'
    ],
    patchManagement: 'Upgrade edge routers to firmware version 12.4.2R-2 which corrects UDP buffering overflows.',
    commands: 'sudo iptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --set\nsudo iptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --update --seconds 60 --hitcount 4 -j DROP'
  },
  {
    category: 'Host Security (Ransomware & Zero-Day)',
    threats: ['Ransomware', 'Zero-Day'],
    priority: 'Critical',
    playbook: 'Active Ransomware Containment & Endpoint Recovery',
    steps: [
      'Immediately isolate the infected subnet and disconnect storage area network (SAN) mappings to prevent lateral encryption.',
      'Initiate credential revokation for compromised service accounts.',
      'Restore system partitions exclusively from read-only air-gapped immutable backup repositories.'
    ],
    patchManagement: 'Apply Microsoft Security Advisory CVE-2026-9914 (Remote Code Execution in SMBv3) on all workstation nodes.',
    commands: 'Disable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol\nSet-SmbServerConfiguration -RejectUnencryptedAccess $true'
  },
  {
    category: 'Application Security (SQL Injection & XSS)',
    threats: ['SQL Injection', 'XSS'],
    priority: 'Medium',
    playbook: 'OWASP Top 10 Web Application Patching',
    steps: [
      'Refactor database access layers to use exclusively parameterized queries or prepared statements.',
      'Implement strict Content Security Policies (CSP) to mitigate Cross-Site Scripting injections.',
      'Deploy Web Application Firewall (WAF) regex layers to intercept SQL signatures (UNION, SELECT, OR 1=1) at reverse proxy level.'
    ],
    patchManagement: 'Ensure node modules / Web packages (Express/Next) are updated to patched versions without active security advisories.',
    commands: '# Example CSP Header:\nContent-Security-Policy: default-src \'self\'; script-src \'self\' https://trusted-cdn.com;'
  }
];
