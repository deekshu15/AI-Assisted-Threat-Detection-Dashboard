import {
  iocs,
  latestCVEs,
  malwareFamilies,
  threatFeeds,
} from "../data/intelligenceMock";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const intelligenceService = {
  async getCVEs() {
    await delay(300);
    return latestCVEs;
  },

  async getIOCs() {
    await delay(300);
    return iocs;
  },

  async getMalwareFamilies() {
    await delay(300);
    return malwareFamilies;
  },

  async getThreatFeeds() {
    await delay(300);
    return threatFeeds;
  },
};

export default intelligenceService;