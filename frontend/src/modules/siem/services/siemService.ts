import {
  activeSessions,
  correlationRules,
  liveEvents,
  severityStatistics,
} from "../data/siemMock";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const siemService = {
  async getEvents() {
    await delay(300);
    return liveEvents;
  },

  async getRules() {
    await delay(300);
    return correlationRules;
  },

  async getSessions() {
    await delay(300);
    return activeSessions;
  },

  async getSeverity() {
    await delay(300);
    return severityStatistics;
  },
};

export default siemService;