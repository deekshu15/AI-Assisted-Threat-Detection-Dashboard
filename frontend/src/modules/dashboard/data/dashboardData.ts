export const threatTimeline = [
  { day: "Mon", threats: 12 },
  { day: "Tue", threats: 18 },
  { day: "Wed", threats: 9 },
  { day: "Thu", threats: 21 },
  { day: "Fri", threats: 15 },
  { day: "Sat", threats: 7 },
  { day: "Sun", threats: 10 },
];

export const threatDistribution = [
  { name: "Malware", value: 35 },
  { name: "DDoS", value: 25 },
  { name: "Brute Force", value: 18 },
  { name: "Phishing", value: 12 },
  { name: "Other", value: 10 },
];

export const recentAlerts = [
  {
    id: 1,
    source: "Windows",
    severity: "High",
    attack: "Brute Force",
    status: "Open",
  },
  {
    id: 2,
    source: "Firewall",
    severity: "Medium",
    attack: "Port Scan",
    status: "Investigating",
  },
  {
    id: 3,
    source: "IDS",
    severity: "Critical",
    attack: "DDoS",
    status: "Open",
  },
];