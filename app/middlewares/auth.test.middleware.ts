import express from "express";

export function authMiddleware(req: express.Request, res: express.Response, next: express.) {
    req.user = {
        _id: "5654d47a481c5186ddaf4479"
    }
    next();
}
