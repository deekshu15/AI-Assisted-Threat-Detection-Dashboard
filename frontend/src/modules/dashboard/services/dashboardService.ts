import {
  threatTimeline,
  threatDistribution,
  recentAlerts,
} from "../data/dashboardData";

export const DashboardService = {
  getThreatTimeline: () => threatTimeline,

  getThreatDistribution: () => threatDistribution,

  getRecentAlerts: () => recentAlerts,
};