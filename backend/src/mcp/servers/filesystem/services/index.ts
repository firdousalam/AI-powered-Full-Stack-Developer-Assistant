import { FilesystemService } from "./filesystem.service";

/**
 * Singleton instance used across the Filesystem MCP Server.
 */
export const filesystemService = new FilesystemService();

export { FilesystemService };