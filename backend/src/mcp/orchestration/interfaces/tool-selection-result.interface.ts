import {
    ToolSelectionStrategy,
} from "../types/orchestration.types";

export interface SelectedTool {
    toolName: string;

    serverName?: string;

    reason?: string;

    arguments?: Record<string, unknown>;
}

export interface ToolSelectionResult {
    strategy: ToolSelectionStrategy;

    tools: SelectedTool[];

    reasoning?: string;
}