import { Response, NextFunction } from "express";
import { RequestWithUser } from "../interfaces/requests/RequestWithUser";

export function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
    req.user = {
        _id: "5654d47a481c5186ddaf4479"
    }
    next();
}
