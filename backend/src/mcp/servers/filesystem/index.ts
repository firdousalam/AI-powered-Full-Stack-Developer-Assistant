// src/mcp/servers/filesystem/index.ts

import { FilesystemServer } from "./filesystem.server";
import { FilesystemService } from "./filesystem.service";
import { FilesystemTools } from "./filesystem.tools";

/**
 * ============================================================
 * Singleton Instances
 * ============================================================
 */

export const filesystemService = new FilesystemService();

export const filesystemTools = new FilesystemTools(
    filesystemService
);

export const filesystemServer = new FilesystemServer(
    filesystemService,
    filesystemTools
);

/**
 * ============================================================
 * Class Exports
 * ============================================================
 */

export {
    FilesystemServer,
    FilesystemService,
    FilesystemTools
};

/**
 * ============================================================
 * Types
 * ============================================================
 */

export * from "./filesystem.types";

/**
 * ============================================================
 * Constants
 * ============================================================
 */

export * from "./filesystem.constants";

/**
 * ============================================================
 * Factory
 * ============================================================
 * Intended for unit tests or creating isolated instances.
 * The application should normally use the singleton
 * `filesystemServer` exported above.
 * ============================================================
 */

export function createFilesystemServer(): FilesystemServer {

    const service = new FilesystemService();

    const tools = new FilesystemTools(service);

    return new FilesystemServer(
        service,
        tools
    );

}