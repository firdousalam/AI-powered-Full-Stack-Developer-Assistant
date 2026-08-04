// src/controllers/mcp.controller.ts

import { Request, Response } from "express";

import { gateway } from "../mcp/gateway";

import { logger } from "../mcp/logger";

import { ToolRequest } from "../mcp/types";

class MCPController {

    /**
     * ============================================================
     * GET /api/v1/mcp/servers
     * ============================================================
     * Returns all registered MCP servers.
     */
    public async getServers(

        req: Request,

        res: Response

    ): Promise<void> {

        try {

            const servers = gateway.getServers();

            res.status(200).json({

                success: true,

                count: servers.length,

                data: servers.map(server => ({

                    id: server.id,

                    name: server.name,

                    version: server.version,

                    status: server.status

                }))

            });

        } catch (error) {

            logger.error(

                "Failed to fetch MCP servers.",

                error

            );

            res.status(500).json({

                success: false,

                error:

                    error instanceof Error

                        ? error.message

                        : "Unknown error"

            });

        }

    }

    /**
     * ============================================================
     * GET /api/v1/mcp/tools
     * ============================================================
     * Returns all discoverable MCP tools.
     */
    public async getTools(

        req: Request,

        res: Response

    ): Promise<void> {

        try {

            const tools = gateway.discoverTools();

            res.status(200).json({

                success: true,

                count: tools.length,

                data: tools.map(tool => ({

                    name: tool.name,

                    description: tool.description

                }))

            });

        } catch (error) {

            logger.error(

                "Failed to discover MCP tools.",

                error

            );

            res.status(500).json({

                success: false,

                error:

                    error instanceof Error

                        ? error.message

                        : "Unknown error"

            });

        }

    }

    /**
     * ============================================================
     * GET /api/v1/mcp/health
     * ============================================================
     * Returns health information for every MCP server.
     */
    public async getHealth(

        req: Request,

        res: Response

    ): Promise<void> {

        try {

            const health = await gateway.healthCheck();

            res.status(200).json({

                success: true,

                data: health

            });

        } catch (error) {

            logger.error(

                "Failed to retrieve health status.",

                error

            );

            res.status(500).json({

                success: false,

                error:

                    error instanceof Error

                        ? error.message

                        : "Unknown error"

            });

        }

    }

    /**
     * ============================================================
     * POST /api/v1/mcp/execute
     * ============================================================
     * Executes an MCP Tool.
     */
    public async executeTool(

        req: Request,

        res: Response

    ): Promise<void> {

        try {

            const {

                serverId,

                toolName,

                args

            } = req.body;

            if (!serverId) {

                res.status(400).json({

                    success: false,

                    error: "serverId is required."

                });

                return;

            }

            if (!toolName) {

                res.status(400).json({

                    success: false,

                    error: "toolName is required."

                });

                return;

            }

            const request: ToolRequest = {

                serverId,

                toolName,

                args

            };

            logger.info(

                `Executing MCP Tool '${toolName}' on '${serverId}'.`

            );

            const response =

                await gateway.executeTool(

                    request

                );

            if (!response.success) {

                res.status(400).json(response);

                return;

            }

            res.status(200).json(response);

        } catch (error) {

            logger.error(

                "Tool execution failed.",

                error

            );

            res.status(500).json({

                success: false,

                error:

                    error instanceof Error

                        ? error.message

                        : "Unknown error"

            });

        }

    }

}

export default new MCPController();