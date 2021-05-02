import { Router } from "express";

const router = Router();

import topic_routes from "./Topic.js";

router.use("/topics", topic_routes);

export default router;
