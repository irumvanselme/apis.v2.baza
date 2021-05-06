export function authMiddleware(req, res, next) {
    (req.user = { _id: "5654d47a481c5186ddaf4479" }), next();
}
