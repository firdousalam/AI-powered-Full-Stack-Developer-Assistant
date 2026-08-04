import { Router } from "express";

import healthRoutes from "./health.routes";
import aiRoutes from "./ai.routes";
import mcpRoutes from "./mcp.routes";

const router = Router();

router.use("/health", healthRoutes);


/**
 * ============================================================
 * AI Routes
 * ============================================================
 */
router.use(
    "/ai",
    aiRoutes
);

/**
 * ============================================================
 * MCP Routes
 * ============================================================
 */
router.use(
    "/mcp",
    mcpRoutes
);

export default router;
