export const gatewayConfig = {

    timeout: 30_000,

    retryAttempts: 3,

    retryDelay: 2_000,

    healthCheckInterval: 30_000,

    autoReconnect: true,

    enableLogging: true

} as const;