export interface ToolRequest {

    server: string;

    tool: string;

    arguments: unknown;

}

export interface ToolResponse {

    success: boolean;

    data?: unknown;

    error?: string;

}