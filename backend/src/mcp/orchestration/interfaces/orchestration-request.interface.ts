export interface OrchestrationRequest {
    userMessage: string;

    workspacePath?: string;

    conversationId?: string;

    metadata?: Record<string, unknown>;
}