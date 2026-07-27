import app from "./app";
import { env } from "./config/env";
import { logger } from "./utils/logger";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.PORT);

const PORT = env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`🚀 Server running on http://localhost:${PORT}`);
    logger("Server Started");

});