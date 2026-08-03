export enum TransportType {
    STDIO = "stdio",
    HTTP = "http",
    WEBSOCKET = "websocket",
}



export const transportConfig = {
    defaultTransport: TransportType.STDIO,
    supportedTransports: [
        TransportType.STDIO,
        TransportType.HTTP,
        TransportType.WEBSOCKET,
    ],
} as const;