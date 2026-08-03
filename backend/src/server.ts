import app from "./app";
import { env } from "./config/env";
import { logger } from "./utils/logger";
import dotenv from "dotenv";
import { bootstrap } from "./mcp/bootstrap";

dotenv.config();

const PORT = env.PORT || 3000;

async function startServer(): Promise<void> {

    try {

        await bootstrap.initialize();

        app.listen(PORT, () => {

            console.log(`🚀 Server running on http://localhost:${PORT}`);

            logger("Server Started");

        });

    }
    catch (error) {

        console.error("Failed to initialize MCP Infrastructure.", error);

        process.exit(1);

    }

}

startServer();