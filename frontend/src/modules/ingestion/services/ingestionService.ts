import {
  pipelineServices,
  streamMetrics,
  uploadHistory,
} from "../data/ingestionMock";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const ingestionService = {
  async getUploads() {
    await delay(400);
    return uploadHistory;
  },

  async getPipelineStatus() {
    await delay(400);
    return pipelineServices;
  },

  async getStreamMetrics() {
    await delay(400);
    return streamMetrics;
  },
};

export default ingestionService;