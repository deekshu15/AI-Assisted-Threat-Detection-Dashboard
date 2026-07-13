import {
  attackCategories,
  executiveMetrics,
  mitreCoverage,
  modelPerformance,
  riskTrend,
  sourceAnalysis,
  threatTrend,
} from "../data/analyticsMock";

const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

const analyticsService = {
  async getExecutiveMetrics() {
    await delay(300);
    return executiveMetrics;
  },

  async getThreatTrend() {
    await delay(300);
    return threatTrend;
  },

  async getRiskTrend() {
    await delay(300);
    return riskTrend;
  },

  async getAttackCategories() {
    await delay(300);
    return attackCategories;
  },

  async getSourceAnalysis() {
    await delay(300);
    return sourceAnalysis;
  },

  async getModelPerformance() {
    await delay(300);
    return modelPerformance;
  },

  async getMitreCoverage() {
    await delay(300);
    return mitreCoverage;
  },
};

export default analyticsService;