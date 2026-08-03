/**
 * ==========================================
 * Tool Request
 * ==========================================
 */

export interface ToolRequest {

    /**
     * Target Server
     */
    serverId: string;

    /**
     * Tool Name
     */
    toolName: string;

    /**
     * Tool Arguments
     */
    arguments?: Record<string, unknown>;

}

/**
 * ==========================================
 * Tool Response
 * ==========================================
 */

export interface ToolResponse {

    /**
     * Execution Status
     */
    success: boolean;

    /**
     * Returned Data
     */
    data?: unknown;

    /**
     * Error Message
     */
    error?: string;

}