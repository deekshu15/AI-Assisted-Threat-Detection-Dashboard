import {
  conversations,
  messages,
  suggestions,
} from "../data/assistantMock";

const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

const assistantService = {
  async getMessages() {
    await delay(200);
    return messages;
  },

  async getSuggestions() {
    await delay(200);
    return suggestions;
  },

  async getConversations() {
    await delay(200);
    return conversations;
  },
};

export default assistantService;