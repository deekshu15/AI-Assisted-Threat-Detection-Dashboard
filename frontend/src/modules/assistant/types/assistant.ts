export type Sender =
  | "user"
  | "assistant";

export interface ChatMessage {
  id: number;
  sender: Sender;
  content: string;
  timestamp: string;
}

export interface SuggestedPrompt {
  id: number;
  title: string;
  prompt: string;
}

export interface Conversation {
  id: number;
  title: string;
  updatedAt: string;
}