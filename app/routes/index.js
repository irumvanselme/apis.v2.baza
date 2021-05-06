import { Router } from "express";
import topic_routes from "./topic.routes.js";

const router = Router();

router.use("/topics", topic_routes);

export default router;
