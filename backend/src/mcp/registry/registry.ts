export interface MCPServer {

    name: string;

    status: "connected" | "disconnected";

    transport: "stdio" | "http";

}