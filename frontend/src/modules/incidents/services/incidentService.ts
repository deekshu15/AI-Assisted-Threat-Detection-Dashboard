import {
  analysts,
  evidenceTimeline,
  incidents,
} from "../data/incidentMock";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const incidentService = {
  async getIncidents() {
    await delay(300);
    return incidents;
  },

  async getEvidence() {
    await delay(300);
    return evidenceTimeline;
  },

  async getAnalysts() {
    await delay(300);
    return analysts;
  },
};

export default incidentService;