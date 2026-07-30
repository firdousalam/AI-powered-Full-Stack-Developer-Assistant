export interface ConversationMessage {

    role: "user" | "assistant";

    content: string;

    timestamp: Date;

}

export interface Conversation {

    sessionId: string;

    messages: ConversationMessage[];

    createdAt: Date;

    updatedAt: Date;

    summary?: string;

}

