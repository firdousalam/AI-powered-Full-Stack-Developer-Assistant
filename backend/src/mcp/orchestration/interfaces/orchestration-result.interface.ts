export type ToolExecutionStatus =
    | "success"
    | "failed"
    | "timeout";

export interface ToolExecutionResult {

    toolName: string;

    serverName?: string;

    status: ToolExecutionStatus;

    data?: unknown;

    error?: string;

    executionTimeMs?: number;
}