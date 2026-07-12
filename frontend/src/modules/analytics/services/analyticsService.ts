import {
  threatTrend,
  modelMetrics,
} from "../data/analyticsMock";

export const AnalyticsService = {
  getThreatTrend: () => threatTrend,

  getModelMetrics: () => modelMetrics,
};