import { Request, Response, NextFunction } from "express";

export const logger = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    console.log(
        `[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl}`
    );

    next();

};