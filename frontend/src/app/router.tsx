import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

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

export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/security-sources" element={<SecuritySourcesPage />} />
          <Route path="/data-ingestion" element={<DataIngestionPage />} />
          <Route path="/threat-detection" element={<ThreatDetectionPage />} />
          <Route path="/threat-intelligence" element={<ThreatIntelligencePage />} />
          <Route path="/siem-monitoring" element={<SIEMMonitoringPage />} />
          <Route path="/incident-response" element={<IncidentResponsePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}