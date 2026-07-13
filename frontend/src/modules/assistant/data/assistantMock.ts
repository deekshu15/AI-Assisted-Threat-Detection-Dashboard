import {
  ChatMessage,
  Conversation,
  SuggestedPrompt,
} from "../types/assistant";

export const suggestions: SuggestedPrompt[] = [
  {
    id: 1,
    title: "Investigate Threat",
    prompt:
      "Investigate today's highest risk incident.",
  },
  {
    id: 2,
    title: "Summarize SIEM",
    prompt:
      "Summarize today's SIEM events.",
  },
  {
    id: 3,
    title: "Explain MITRE",
    prompt:
      "Explain the detected MITRE ATT&CK techniques.",
  },
  {
    id: 4,
    title: "Generate Report",
    prompt:
      "Generate an executive security summary.",
  },
];

export const conversations: Conversation[] = [
  {
    id: 1,
    title: "Threat Investigation",
    updatedAt: "Today",
  },
  {
    id: 2,
    title: "Executive Report",
    updatedAt: "Yesterday",
  },
];

export const messages: ChatMessage[] = [
  {
    id: 1,
    sender: "assistant",
    content:
      "Hello. I am your AI Security Assistant. I can help investigate threats, explain detections, summarize incidents, and generate reports.",
    timestamp: "09:00",
  },
];