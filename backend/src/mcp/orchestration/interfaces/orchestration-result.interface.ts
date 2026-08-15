import {
    OrchestrationStatus,
    ToolExecutionStatus,
} from "../types/orchestration.types";

export interface ToolExecutionResult {
    toolName: string;

    serverName?: string;

    status: ToolExecutionStatus;

    data?: unknown;

    error?: string;

    executionTimeMs?: number;
}

export interface OrchestrationResult {
    status: OrchestrationStatus;

    response?: string;

    toolResults: ToolExecutionResult[];

    context?: Record<string, unknown>;

    error?: string;
}