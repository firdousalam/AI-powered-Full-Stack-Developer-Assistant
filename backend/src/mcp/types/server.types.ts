export enum ServerStatus {

    CREATED = "created",

    CONNECTING = "connecting",

    CONNECTED = "connected",

    DISCONNECTED = "disconnected",

    DEGRADED = "degraded",

    UNAVAILABLE = "unavailable",

    ERROR = "error"

}

export interface MCPTool {

    /**
     * Tool Name
     * Example: readFile
     */
    name: string;

    /**
     * Tool Description
     */
    description: string;

}

export interface MCPServer {

    /**
     * Unique Server Id
     */
    id: string;

    /**
     * Display Name
     */
    name: string;

    /**
     * Server Version
     */
    version: string;

    /**
     * Transport Type
     */
    transport: string;

    /**
     * Current Status
     */
    status: ServerStatus;

    /**
     * Registered Tools
     */
    tools: MCPTool[];

}