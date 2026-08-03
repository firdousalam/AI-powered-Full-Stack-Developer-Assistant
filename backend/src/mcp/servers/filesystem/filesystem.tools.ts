// src/mcp/servers/filesystem/filesystem.tools.ts

import { FilesystemService } from "./filesystem.service";
import { FILESYSTEM_TOOLS } from "./filesystem.constants";
import { MCPTool } from "../../types";

export class FilesystemTools {

    constructor(
        private readonly filesystemService: FilesystemService
    ) { }

    /**
     * Returns all supported MCP tools.
     */
    public getTools(): MCPTool[] {

        return [

            {
                name: FILESYSTEM_TOOLS.READ_FILE,
                description: "Read the contents of a file.",

                inputSchema: {
                    type: "object",
                    properties: {
                        path: {
                            type: "string",
                            description: "Relative file path"
                        }
                    },
                    required: ["path"]
                },

                execute: async (args: any) => {

                    return await this.filesystemService.readFile(
                        args.path
                    );

                }
            },

            {
                name: FILESYSTEM_TOOLS.LIST_DIRECTORY,
                description: "List files and folders.",

                inputSchema: {
                    type: "object",
                    properties: {
                        path: {
                            type: "string"
                        }
                    }
                },

                execute: async (args: any) => {

                    return await this.filesystemService.listDirectory(
                        args.path ?? "."
                    );

                }
            },

            {
                name: FILESYSTEM_TOOLS.FILE_EXISTS,
                description: "Check whether a file exists.",

                inputSchema: {
                    type: "object",
                    properties: {
                        path: {
                            type: "string"
                        }
                    },
                    required: ["path"]
                },

                execute: async (args: any) => {

                    return await this.filesystemService.fileExists(
                        args.path
                    );

                }
            },

            {
                name: FILESYSTEM_TOOLS.FILE_METADATA,
                description: "Retrieve file metadata.",

                inputSchema: {
                    type: "object",
                    properties: {
                        path: {
                            type: "string"
                        }
                    },
                    required: ["path"]
                },

                execute: async (args: any) => {

                    return await this.filesystemService.getFileMetadata(
                        args.path
                    );

                }
            },

            {
                name: FILESYSTEM_TOOLS.READ_MULTIPLE_FILES,
                description: "Read multiple files.",

                inputSchema: {
                    type: "object",
                    properties: {
                        paths: {
                            type: "array",
                            items: {
                                type: "string"
                            }
                        }
                    },
                    required: ["paths"]
                },

                execute: async (args: any) => {

                    return await this.filesystemService.readMultipleFiles(
                        args.paths
                    );

                }
            },

            {
                name: FILESYSTEM_TOOLS.SEARCH_FILES,
                description: "Search files by name.",

                inputSchema: {
                    type: "object",
                    properties: {
                        query: {
                            type: "string"
                        },
                        directory: {
                            type: "string"
                        }
                    },
                    required: ["query"]
                },

                execute: async (args: any) => {

                    return await this.filesystemService.searchFiles(
                        args.query,
                        args.directory
                    );

                }
            },

            {
                name: FILESYSTEM_TOOLS.PROJECT_TREE,
                description: "Generate project tree.",

                inputSchema: {
                    type: "object",
                    properties: {
                        directory: {
                            type: "string"
                        }
                    }
                },

                execute: async (args: any) => {

                    return await this.filesystemService.buildProjectTree(
                        args.directory
                    );

                }
            }

        ];

    }

    /**
     * Get tool by name.
     */
    public getTool(
        name: string
    ): MCPTool | undefined {

        return this.getTools().find(

            tool => tool.name === name

        );

    }

    /**
     * Check tool availability.
     */
    public hasTool(
        name: string
    ): boolean {

        return this.getTools().some(

            tool => tool.name === name

        );

    }

    /**
     * List tool names.
     */
    public listToolNames(): string[] {

        return this.getTools().map(

            tool => tool.name

        );

    }

}
