import { Router } from "express";

import healthRoutes from "./health.routes";
import aiRoutes from "./ai.routes";

const router = Router();

router.use("/health", healthRoutes);

router.use("/api/v1/ai", aiRoutes);

export default router;