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
    const response = await fetch("http://localhost:8000/api/cves");
    if (!response.ok) {
      throw new Error("Failed to fetch CVEs from local API");
    }
    return response.json();
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