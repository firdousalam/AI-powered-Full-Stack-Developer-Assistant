export const serverConfig = {

    autoStart: true,

    autoReconnect: true,

    startupTimeout: 15_000,

    shutdownTimeout: 5_000,

    workspaceRoot: process.cwd()

} as const;