import { Router } from "express";

import mcpController from "../controllers/mcp.controller";

const router = Router();

/**
 * ============================================================
 * MCP Server Endpoints
 * ============================================================
 */

/**
 * GET /api/v1/mcp/servers
 *
 * Returns all registered MCP servers.
 */
router.get(
    "/servers",
    mcpController.getServers.bind(mcpController)
);

/**
 * GET /api/v1/mcp/tools
 *
 * Returns all available MCP tools.
 */
router.get(
    "/tools",
    mcpController.getTools.bind(mcpController)
);

/**
 * GET /api/v1/mcp/health
 *
 * Returns health information for every server.
 */
router.get(
    "/health",
    mcpController.getHealth.bind(mcpController)
);

/**
 * POST /api/v1/mcp/execute
 *
 * Execute an MCP Tool.
 */
router.post(
    "/execute",
    mcpController.executeTool.bind(mcpController)
);

export default router;