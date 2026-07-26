// import { Router } from "express";

// import {

//     healthController

// } from "../controllers/health.controller";

// const router = Router();

// router.get(

//     "/",

//     healthController

// );

// export default router;


import { Router } from "express";
import { getHealth } from "../controllers/health.controller";

const router = Router();

router.get("/", getHealth);

export default router;