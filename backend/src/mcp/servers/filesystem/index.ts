
// src/mcp/servers/filesystem/index.ts

import { FilesystemServer } from "./filesystem.server";
import { FilesystemService } from "./filesystem.service";
import { FilesystemTools } from "./filesystem.tools";

/**
 * Create singleton instances
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
 * Module Exports
 */
export {
    FilesystemServer,
    FilesystemService,
    FilesystemTools
};

/**
 * Export Types
 */
export * from "./filesystem.types";

/**
 * Export Constants
 */
export * from "./filesystem.constants";

/**
 * Factory Method
 */
export function createFilesystemServer(): FilesystemServer {

    const service = new FilesystemService();

    const tools = new FilesystemTools(service);

    return new FilesystemServer(
        service,
        tools
    );

}
