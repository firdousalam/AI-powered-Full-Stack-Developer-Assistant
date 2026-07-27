import { Request, Response, NextFunction } from "express";

export function loggerMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {

    console.log("==========");

    console.log(req.method);

    console.log(req.url);

    console.log(req.headers["x-request-id"]);

    console.log("==========");

    next();

}