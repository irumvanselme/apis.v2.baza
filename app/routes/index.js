import { Router } from "express";
import topic_routes from "./Topic.js";

const router = Router();

router.use("/topics", topic_routes);

export default router;
