export type SenderType = "user" | "ai";

export interface Message {
  id: string;
  senderType: SenderType;
  content: string;
  createdAt: string;
}

export interface SendMessageResult {
  userMessage: Message;
  aiMessage: Message | null;
}
