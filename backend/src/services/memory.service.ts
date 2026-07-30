import { Conversation, ConversationMessage } from "../types/conversation.types";
import { MEMORY_CONFIG } from "../config/memory.config";
import summaryService from "./summary.service";

class MemoryService {

    private conversations = new Map<string, Conversation>();

    public createSession(sessionId: string): void {

        if (this.conversations.has(sessionId)) {

            return;

        }

        this.conversations.set(sessionId, {

            sessionId,

            messages: [],

            createdAt: new Date(),

            updatedAt: new Date()

        });

    }

    public getConversation(sessionId: string): Conversation {

        if (!this.conversations.has(sessionId)) {

            this.createSession(sessionId);

        }

        return this.conversations.get(sessionId)!;

    }

    public addMessage(

        sessionId: string,

        role: "user" | "assistant",

        content: string

    ): void {

        const conversation = this.getConversation(sessionId);

        conversation.messages.push({

            role,

            content,

            timestamp: new Date()

        });

        conversation.updatedAt = new Date();

        this.trimConversation(conversation);

    }

    public getMessages(

        sessionId: string

    ): ConversationMessage[] {

        return this.getConversation(sessionId).messages;

    }

    private trimConversation(

        conversation: Conversation

    ): void {

        if (

            conversation.messages.length >

            MEMORY_CONFIG.MAX_MESSAGES

        ) {

            conversation.messages =

                conversation.messages.slice(

                    -MEMORY_CONFIG.MAX_MESSAGES

                );

        }

    }

    public clearConversation(

        sessionId: string

    ): void {

        this.conversations.delete(sessionId);

    }

    public cleanupExpiredSessions(): void {

        const now = Date.now();

        const timeout =

            MEMORY_CONFIG.SESSION_TIMEOUT_MINUTES *

            60 *

            1000;

        for (const [id, conversation] of this.conversations) {

            if (

                now -

                conversation.updatedAt.getTime() >

                timeout

            ) {

                this.conversations.delete(id);

            }

        }

    }

    public getSessionCount(): number {

        return this.conversations.size;

    }

    getRecentMessages(

        sessionId: string

    ) {

        const conversation =

            this.getConversation(sessionId);

        if (

            conversation.messages.length >

            MEMORY_CONFIG.SUMMARY_THRESHOLD

        ) {

            conversation.summary =

                summaryService.summarize(

                    conversation.messages.map(

                        m => m.content

                    )

                );

        }

        return conversation.messages.slice(

            -MEMORY_CONFIG.MAX_CONTEXT_MESSAGES

        );

    }

}

export default new MemoryService();