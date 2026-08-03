import { loggerConfig } from "../config";
import { LogLevel } from "../types/logger.types";

class MCPLogger {

    private readonly logLevels: Record<LogLevel, number> = {

        [LogLevel.DEBUG]: 0,

        [LogLevel.INFO]: 1,

        [LogLevel.WARN]: 2,

        [LogLevel.ERROR]: 3

    };

    private shouldLog(level: LogLevel): boolean {

        return this.logLevels[level] >= this.logLevels[loggerConfig.level];

    }

    private formatMessage(

        level: LogLevel,

        message: string

    ): string {

        const timestamp = loggerConfig.enableTimestamp

            ? `[${new Date().toISOString()}] `

            : "";

        return `${timestamp}[${level.toUpperCase()}] ${message}`;

    }

    debug(message: string): void {

        if (!this.shouldLog(LogLevel.DEBUG)) return;

        console.debug(

            this.formatMessage(

                LogLevel.DEBUG,

                message

            )

        );

    }

    info(message: string): void {

        if (!this.shouldLog(LogLevel.INFO)) return;

        console.info(

            this.formatMessage(

                LogLevel.INFO,

                message

            )

        );

    }

    warn(message: string): void {

        if (!this.shouldLog(LogLevel.WARN)) return;

        console.warn(

            this.formatMessage(

                LogLevel.WARN,

                message

            )

        );

    }

    error(

        message: string,

        error?: unknown

    ): void {

        if (!this.shouldLog(LogLevel.ERROR)) return;

        console.error(

            this.formatMessage(

                LogLevel.ERROR,

                message

            ),

            error

        );

    }

}

export default new MCPLogger();