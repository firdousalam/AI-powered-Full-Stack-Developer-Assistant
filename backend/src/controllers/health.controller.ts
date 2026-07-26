// import { Request, Response } from "express";

// import { healthService } from "../services/health.service";

// export const healthController = (

//     _req: Request,

//     res: Response

// ) => {

//     res.json(

//         healthService()

//     );

// };

import { Request, Response } from "express";

export const getHealth = (
    req: Request,
    res: Response
) => {

    res.json({

        status: "OK",

        version: "1.0.0",

        uptime: process.uptime(),

        timestamp: new Date().toISOString(),

        environment: process.env.NODE_ENV || "development"

    });

};