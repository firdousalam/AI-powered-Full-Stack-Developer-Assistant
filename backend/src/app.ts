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

const app = express();

app.use(express.json());

app.use(routes);

export default app;