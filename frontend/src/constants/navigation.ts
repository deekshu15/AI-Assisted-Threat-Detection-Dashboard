import type { NavigationItem } from "../types/navigation";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import ScannerRoundedIcon from "@mui/icons-material/ScannerRounded";
import QrCodeRoundedIcon from "@mui/icons-material/QrCodeRounded";
import LanRoundedIcon from "@mui/icons-material/LanRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import WebRoundedIcon from "@mui/icons-material/WebRounded";
import BiotechRoundedIcon from "@mui/icons-material/BiotechRounded";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";

const coreTools: NavigationItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: DashboardRoundedIcon },
  { label: "Security Sources", path: "/security-sources", icon: SecurityRoundedIcon },
  { label: "Data Ingestion", path: "/data-ingestion", icon: CloudUploadRoundedIcon },
  { label: "Static Data", path: "/static-data", icon: StorageRoundedIcon },
  { label: "Live API", path: "/live-api", icon: ApiRoundedIcon },
  { label: "REST API", path: "/rest-api", icon: ApiRoundedIcon },
  { label: "Image Scan", path: "/image-scan", icon: ScannerRoundedIcon },
  { label: "Barcode", path: "/barcode", icon: QrCodeRoundedIcon },
  { label: "Nmap", path: "/nmap", icon: LanRoundedIcon },
  { label: "Statistics", path: "/statistics", icon: InsightsRoundedIcon },
  { label: "Threat Detection", path: "/threat-detection", icon: BugReportRoundedIcon },
  { label: "Threat Intelligence", path: "/threat-intelligence", icon: PsychologyRoundedIcon },
  { label: "SIEM Monitoring", path: "/siem-monitoring", icon: MonitorHeartRoundedIcon },
  { label: "Incident Response", path: "/incident-response", icon: WarningAmberRoundedIcon },
  { label: "Analytics", path: "/analytics", icon: AnalyticsRoundedIcon },
  { label: "Reports", path: "/reports", icon: DescriptionRoundedIcon },
  { label: "AI Assistant", path: "/ai-assistant", icon: SmartToyRoundedIcon },
];

const pages: NavigationItem[] = [
  { label: "API Keys", path: "/api-keys", icon: KeyRoundedIcon },
  { label: "AI Summary", path: "/ai-summary", icon: AutoAwesomeRoundedIcon },
  { label: "AI Recs", path: "/ai-recs", icon: TuneRoundedIcon },
];

const securityTools: NavigationItem[] = [
  {
    label: "Vulnerability Assessment",
    path: "/vulnerability-assessment",
    icon: SecurityOutlinedIcon,
  },
  {
    label: "Penetration Testing",
    icon: TerminalRoundedIcon,
    groupKey: "penetration",
    children: [
      { label: "Metasploit Framework", path: "/metasploit", icon: TerminalRoundedIcon },
      { label: "SQLmap", path: "/sqlmap", icon: TerminalRoundedIcon },
      { label: "John the Ripper", path: "/john-the-ripper", icon: TerminalRoundedIcon },
    ],
  },
  {
    label: "Web Application Security",
    icon: WebRoundedIcon,
    groupKey: "webapp",
    children: [
      { label: "OWASP ZAP", path: "/owasp", icon: WebRoundedIcon },
      { label: "Wapiti", path: "/wapiti", icon: WebRoundedIcon },
    ],
  },
  {
    label: "SIEM & Monitoring",
    icon: MonitorHeartRoundedIcon,
    groupKey: "siem",
    children: [
      { label: "Wazuh", path: "/wazuh", icon: MonitorHeartRoundedIcon },
      { label: "Snort", path: "/snort", icon: MonitorHeartRoundedIcon },
    ],
  },
  {
    label: "Digital Forensics",
    icon: BiotechRoundedIcon,
    groupKey: "forensics",
    children: [
      { label: "Autopsy", path: "/autopsy", icon: BiotechRoundedIcon },
      { label: "Volatility", path: "/volatility", icon: BiotechRoundedIcon },
    ],
  },
];

export const navigation: NavigationItem[] = [
  { label: "Core Tools", groupKey: "core", icon: WidgetsRoundedIcon, children: coreTools },
  { label: "Pages", groupKey: "pages", icon: FactCheckRoundedIcon, children: pages },
  { label: "Security Tools", groupKey: "security", icon: SecurityRoundedIcon, children: securityTools },
  { label: "Settings", path: "/settings", icon: SettingsRoundedIcon },
];

export default navigation;