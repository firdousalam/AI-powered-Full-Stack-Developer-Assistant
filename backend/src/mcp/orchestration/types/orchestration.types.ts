export type OrchestrationStatus =
    | "completed"
    | "failed"
    | "no_tool_required";

export type ToolSelectionStrategy =
    | "none"
    | "single"
    | "multiple";

export type ToolExecutionStatus =
    | "success"
    | "failed"
    | "timeout";