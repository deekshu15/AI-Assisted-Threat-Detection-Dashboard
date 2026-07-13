import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import LandingPage from "../pages/LandingPage";
import DashboardPage from "../modules/dashboard/DashboardPage";
import SecuritySourcesPage from "../modules/security/SecuritySourcesPage";
import DataIngestionPage from "../modules/ingestion/DataIngestionPage";
import ThreatDetectionPage from "../modules/detection/ThreatDetectionPage";
import ThreatIntelligencePage from "../modules/intelligence/ThreatIntelligencePage";
import SIEMMonitoringPage from "../modules/siem/SIEMMonitoringPage";
import IncidentResponsePage from "../modules/incidents/IncidentResponsePage";
import AnalyticsPage from "../modules/analytics/AnalyticsPage";
import ReportsPage from "../modules/reports/ReportsPage";
import SettingsPage from "../modules/settings/SettingsPage";
import AssistantPage from "../modules/assistant/AssistantPage";
import PlaceholderFeaturePage from "../modules/shared/PlaceholderFeaturePage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/security-sources" element={<SecuritySourcesPage />} />
          <Route path="/data-ingestion" element={<DataIngestionPage />} />
          <Route path="/threat-detection" element={<ThreatDetectionPage />} />
          <Route path="/threat-intelligence" element={<ThreatIntelligencePage />} />
          <Route path="/siem-monitoring" element={<SIEMMonitoringPage />} />
          <Route path="/incident-response" element={<IncidentResponsePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/ai-assistant" element={<AssistantPage />} />
          <Route path="/static-data" element={<PlaceholderFeaturePage title="Static Data" description="Inspect curated static datasets and their latest validation state." stats={[{label:"Records indexed", value:"1.3M", detail:"freshly normalized"},{label:"Last refresh", value:"12m ago", detail:"automatic pipeline"},{label:"Coverage", value:"97%", detail:"high confidence"}]} badge="Static" />} />
          <Route path="/live-api" element={<PlaceholderFeaturePage title="Live API" description="Monitor live API endpoints and active integrations." stats={[{label:"Uptime", value:"99.97%", detail:"across regions"},{label:"Latency", value:"182ms", detail:"p95 response"},{label:"Failures", value:"0", detail:"last 24h"}]} badge="Live" />} />
          <Route path="/rest-api" element={<PlaceholderFeaturePage title="REST API" description="Review request health, schema drift, and API consumption trends." stats={[{label:"Requests", value:"44.2K", detail:"latest 24h"},{label:"Auth success", value:"98.6%", detail:"token validity"},{label:"Schemas", value:"21", detail:"active versions"}]} badge="API" />} />
          <Route path="/image-scan" element={<PlaceholderFeaturePage title="Image Scan" description="Inspect container images and artifact risk signals." stats={[{label:"Images scanned", value:"352", detail:"this week"},{label:"Critical findings", value:"4", detail:"requires review"},{label:"Policy pass", value:"96%", detail:"automated"}]} badge="Images" />} />
          <Route path="/barcode" element={<PlaceholderFeaturePage title="Barcode" description="Track serialized assets, inventory objects, and scanned identifiers." stats={[{label:"Scans", value:"1,820", detail:"today"},{label:"Matches", value:"94%", detail:"valid"},{label:"Exceptions", value:"7", detail:"manual review"}]} badge="Barcode" />} />
          <Route path="/nmap" element={<PlaceholderFeaturePage title="Nmap" description="Review network discovery results and host exposure findings." stats={[{label:"Hosts scanned", value:"218", detail:"last sweep"},{label:"Open ports", value:"63", detail:"potential exposure"},{label:"Critical", value:"2", detail:"needs action"}]} badge="Recon" />} />
          <Route path="/statistics" element={<PlaceholderFeaturePage title="Statistics" description="Track system metrics, growth trends, and assurance KPIs." stats={[{label:"Signals/day", value:"18.2K", detail:"ingestion velocity"},{label:"Growth", value:"+14%", detail:"month over month"},{label:"Confidence", value:"93%", detail:"model certainty"}]} badge="Stats" />} />
          <Route path="/api-keys" element={<PlaceholderFeaturePage title="API Keys" description="Manage API access, rotation schedules, and integration trust levels." stats={[{label:"Active keys", value:"12", detail:"production"},{label:"Expiring soon", value:"3", detail:"within 7 days"},{label:"Revoked", value:"2", detail:"this month"}]} badge="Keys" />} />
          <Route path="/ai-summary" element={<PlaceholderFeaturePage title="AI Summary" description="Summarize current incidents, investigation progress, and response posture." stats={[{label:"Summaries", value:"48", detail:"last 24h"},{label:"Coverage", value:"89%", detail:"critical cases"},{label:"Quality", value:"4.8/5", detail:"analyst rating"}]} badge="Summary" />} />
          <Route path="/ai-recs" element={<PlaceholderFeaturePage title="AI Recs" description="Review AI-generated recommendations and operational next steps." stats={[{label:"Recommendations", value:"24", detail:"ranked"},{label:"Accepted", value:"68%", detail:"auto-accepted"},{label:"Priority", value:"High", detail:"escalation queue"}]} badge="Recs" />} />
          <Route path="/vulnerability-assessment" element={<PlaceholderFeaturePage title="Vulnerability Assessment" description="Monitor known weaknesses and remediation tracking across all monitors." stats={[{label:"Assets reviewed", value:"392", detail:"active scope"},{label:"Critical vulns", value:"11", detail:"requires patching"},{label:"Remediated", value:"76%", detail:"this quarter"}]} badge="Vulns" />} />
          <Route path="/penetration-testing" element={<PlaceholderFeaturePage title="Penetration Testing" description="Coordinate penetration exercises, scope, and recommended testing modules." stats={[{label:"Tests run", value:"8", detail:"current cycle"},{label:"Open findings", value:"14", detail:"triage backlog"},{label:"Coverage", value:"92%", detail:"critical paths"}]} badge="Pentest" />} />
          <Route path="/metasploit" element={<PlaceholderFeaturePage title="Metasploit Framework" description="Track payload readiness, module health, and tactical execution notes." stats={[{label:"Modules", value:"137", detail:"available"},{label:"Health", value:"Stable", detail:"last validated"},{label:"Runs", value:"4", detail:"this week"}]} badge="Metasploit" />} />
          <Route path="/sqlmap" element={<PlaceholderFeaturePage title="SQLmap" description="Inspect database exposure testing status and findings summary." stats={[{label:"Targets", value:"12", detail:"in queue"},{label:"Findings", value:"3", detail:"critical"},{label:"Tests", value:"9", detail:"completed"}]} badge="SQLmap" />} />
          <Route path="/john-the-ripper" element={<PlaceholderFeaturePage title="John the Ripper" description="Review password cracking workflow status and coverage." stats={[{label:"Runs", value:"6", detail:"this week"},{label:"Hash types", value:"19", detail:"supported"},{label:"Progress", value:"74%", detail:"active"}]} badge="JTR" />} />
          <Route path="/web-application-security" element={<PlaceholderFeaturePage title="Web Application Security" description="Review web app inspections, findings, and posture changes." stats={[{label:"Sites tested", value:"27", detail:"this month"},{label:"Critical flaws", value:"5", detail:"needs remediation"},{label:"Coverage", value:"88%", detail:"automation"}]} badge="WAS" />} />
          <Route path="/owasp" element={<PlaceholderFeaturePage title="OWASP ZAP" description="Track active scans, rule coverage, and issue queues." stats={[{label:"Scans", value:"16", detail:"current"},{label:"Rules", value:"84", detail:"enabled"},{label:"Findings", value:"8", detail:"active"}]} badge="OWASP" />} />
          <Route path="/wapiti" element={<PlaceholderFeaturePage title="Wapiti" description="Monitor crawl coverage and discovered site weaknesses." stats={[{label:"Targets", value:"9", detail:"active"},{label:"Pages scanned", value:"482", detail:"recent"},{label:"Issues", value:"4", detail:"high priority"}]} badge="Wapiti" />} />
          <Route path="/siem-monitoring-tools" element={<PlaceholderFeaturePage title="SIEM & Monitoring" description="Coordinate monitoring tooling health, event volume, and detections." stats={[{label:"Event volume", value:"1.1M", detail:"today"},{label:"Rules enabled", value:"186", detail:"active"},{label:"Latency", value:"2.3s", detail:"ingestion"}]} badge="SIEM" />} />
          <Route path="/wazuh" element={<PlaceholderFeaturePage title="Wazuh" description="Inspect endpoint monitoring, agent health, and event routes." stats={[{label:"Agents", value:"143", detail:"connected"},{label:"Alerts", value:"11", detail:"high severity"},{label:"Health", value:"98.4%", detail:"online"}]} badge="Wazuh" />} />
          <Route path="/snort" element={<PlaceholderFeaturePage title="Snort" description="Review intrusion sensor performance and signature coverage." stats={[{label:"Sensors", value:"12", detail:"active"},{label:"Rules", value:"1,640", detail:"loaded"},{label:"Matches", value:"43", detail:"latest"}]} badge="Snort" />} />
          <Route path="/forensics" element={<PlaceholderFeaturePage title="Digital Forensics" description="Coordinate forensic evidence review, chain of custody, and triage tasks." stats={[{label:"Cases", value:"9", detail:"open"},{label:"Evidence", value:"36", detail:"processed"},{label:"Backlog", value:"4", detail:"queued"}]} badge="Forensics" />} />
          <Route path="/autopsy" element={<PlaceholderFeaturePage title="Autopsy" description="Track evidence processing queues and case notes." stats={[{label:"Cases", value:"4", detail:"in progress"},{label:"Images", value:"18", detail:"mounted"},{label:"Triage", value:"82%", detail:"complete"}]} badge="Autopsy" />} />
          <Route path="/volatility" element={<PlaceholderFeaturePage title="Volatility" description="Review memory analysis jobs and collection status." stats={[{label:"Jobs", value:"7", detail:"current"},{label:"Artifacts", value:"56", detail:"extracted"},{label:"Queue", value:"2", detail:"pending"}]} badge="Volatility" />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}