import { LogLevel } from "../types/logger.types";

export const loggerConfig = {

    level: LogLevel.INFO,

    enableConsole: true,

    enableTimestamp: true,

    enableColors: true

} as const;