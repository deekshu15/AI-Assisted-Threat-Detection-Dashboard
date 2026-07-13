import {
  models,
  predictionHistory,
  predictionSummary,
} from "../data/detectionMock";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const detectionService = {
  async getModels() {
    await delay(400);
    return models;
  },

  async getSummary() {
    await delay(400);
    return predictionSummary;
  },

  async getPredictions() {
    await delay(400);
    return predictionHistory;
  },
};

export default detectionService;