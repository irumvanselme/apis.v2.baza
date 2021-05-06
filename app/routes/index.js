import { Router } from "express";
import topic_routes from "./topic.routes.js";
import question_routes from "./question.routes.js";

const router = Router();

router.use("/topics", topic_routes);
router.use("/questions", question_routes);

export default router;
