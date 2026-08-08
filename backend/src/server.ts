import app from "./app";
import { env } from "./config/env";
import { logger } from "./utils/logger";
import dotenv from "dotenv";
import { bootstrap } from "./mcp/bootstrap";
import { gateway } from "./mcp/gateway";
import { FilesystemServer, filesystemService, filesystemTools } from "./mcp/servers/filesystem";

const filesystemServer =
    new FilesystemServer(
        filesystemService,
        filesystemTools
    );

// IMPORTANT: initialize/connect first
filesystemServer.initialize();


dotenv.config();

const PORT = env.PORT || 3000;

async function startServer(): Promise<void> {

    try {

        await filesystemServer.initialize();

        await bootstrap.initialize();

        app.listen(PORT, () => {

            console.log(
                `🚀 Server running on http://localhost:${PORT}`
            );

            logger("Server Started");

        });

        const result =
            await gateway.executeTool({
                serverId: "filesystem-server",
                toolName: "analyzeDependencies",
                args: {
                    workspacePath: process.cwd()
                }
            });

        console.log(
            JSON.stringify(
                result,
                null,
                2
            )
        );

    }
    catch (error) {

        console.error(
            "Failed to initialize MCP Infrastructure.",
            error
        );

        process.exit(1);

    }

}

startServer();