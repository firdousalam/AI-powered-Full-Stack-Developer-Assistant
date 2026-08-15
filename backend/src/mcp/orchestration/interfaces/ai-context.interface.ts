export interface AIContextItem {
    source: string;

    toolName: string;

    data: unknown;

    metadata?: Record<string, unknown>;
}

export interface AIContext {
    userMessage: string;

    workspacePath?: string;

    items: AIContextItem[];

    metadata?: Record<string, unknown>;
}