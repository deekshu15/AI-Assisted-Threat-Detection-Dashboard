import {
  securityEvents,
  securitySources,
} from "../data/securityMock";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const securityService = {
  async getSources() {
    await delay(400);
    return securitySources;
  },

  async getRecentEvents() {
    await delay(400);
    return securityEvents;
  },
};

export default securityService;