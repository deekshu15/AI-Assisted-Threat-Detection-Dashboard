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
    const response = await fetch("http://localhost:8000/api/siem/events");
    if (!response.ok) {
      throw new Error("Failed to fetch SIEM events from local API");
    }
    return response.json();
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
    const response = await fetch("http://localhost:8000/api/siem/severity");
    if (!response.ok) {
      throw new Error("Failed to fetch severity data from local API");
    }
    return response.json();
  },
};

export default siemService;