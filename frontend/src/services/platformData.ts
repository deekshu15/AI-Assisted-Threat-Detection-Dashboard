import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";

export const landingFeatureCards = [
  {
    title: "AI Threat Detection",
    description:
      "Continuously correlates alerts, anomalies, and contextual signals to prioritize the events that matter most.",
    icon: ShieldRoundedIcon,
  },
  {
    title: "Real-Time Monitoring",
    description:
      "A live operational view of cloud, endpoint, identity, and network telemetry for rapid response.",
    icon: MonitorHeartRoundedIcon,
  },
  {
    title: "Threat Intelligence",
    description:
      "Maps indicators, vulnerabilities, and attacker behaviors to actionable security insights.",
    icon: PsychologyRoundedIcon,
  },
  {
    title: "Elastic Analytics",
    description:
      "Investigate trends, tune detections, and accelerate root cause analysis with executive-ready visuals.",
    icon: InsightsRoundedIcon,
  },
  {
    title: "AWS Integration",
    description:
      "Designed for future integration with Lambda, S3, Kinesis, Athena, SageMaker, and more.",
    icon: CloudRoundedIcon,
  },
  {
    title: "AI Security Assistant",
    description:
      "A contextual copilot for triage, investigation, playbook execution, and reporting workflows.",
    icon: SmartToyRoundedIcon,
  },
];

export const architectureLayers = [
  "Security Sources",
  "Data Ingestion",
  "Processing Layer",
  "AI Threat Detection",
  "Risk Intelligence",
  "Visualization",
  "SOC Analyst",
];

export const technologyCards = [
  {
    title: "Frontend",
    items: ["React 19", "TypeScript", "Vite", "Material UI", "Recharts"],
    icon: DashboardRoundedIcon,
  },
  {
    title: "Cloud",
    items: ["AWS Lambda", "Amazon S3", "Kinesis", "API Gateway"],
    icon: CloudRoundedIcon,
  },
  {
    title: "AI / ML",
    items: ["SageMaker", "OpenRouter", "RAG", "ML Detection"],
    icon: AutoAwesomeRoundedIcon,
  },
  {
    title: "Data & Storage",
    items: ["DynamoDB", "Athena", "Glue", "Security Lake"],
    icon: StorageRoundedIcon,
  },
];

export const metrics = [
  { label: "Threats analyzed", value: "18.4K" },
  { label: "Mean time to triage", value: "2.1m" },
  { label: "Automation coverage", value: "94%" },
  { label: "SOC confidence", value: "99.2%" },
];

export const landingHighlights = [
  "Enterprise-grade experience with cloud-native architecture",
  "Designed for future API and live telemetry integration",
  "Built for SOC analysts, platform engineers, and CISOs",
];

export const trustSignals = [
  "MITRE ATT&CK aligned investigations",
  "Multi-source telemetry correlation",
  "Executive and operational reporting",
  "Security-first accessibility and UX",
];

export const aboutPoints = [
  {
    title: "Project Vision",
    body: "Create a premium cybersecurity platform experience that unifies detection, intelligence, and response into a single operational workspace.",
  },
  {
    title: "Objectives",
    body: "Deliver visibility, analyst productivity, and scalable architecture while keeping the frontend ready for future backend services.",
  },
  {
    title: "Problem Statement",
    body: "Modern SOC teams need clarity and speed when monitoring disjointed data sources and escalating security events.",
  },
  {
    title: "Benefits",
    body: "Reduce noise, improve context, accelerate incident decisions, and strengthen operational resilience.",
  },
];
