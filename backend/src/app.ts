// import dotenv from "dotenv";

// dotenv.config();

// import express from "express";

// import healthRoutes from "./routes/health.routes";

// const app = express();

// app.use(express.json());

// app.use(

//     "/health",

//     healthRoutes

// );

// export default app;

import express from "express";
import routes from "./routes";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { requestIdMiddleware } from "./middlewares/requestId.middleware";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(routes);
app.use(morgan("dev"));
app.use(requestIdMiddleware);
app.use(loggerMiddleware);
app.use(errorMiddleware);

export default app;