import { Router } from "express";
import topic_routes from "./topic.routes.js";
import question_routes from "./question.routes.js";
import answers_routes from "./answers.routes.js";
import comments_routes from "./comments.routes.js";

const router = Router();

router.use("/topics", topic_routes);
router.use("/questions", question_routes);
router.use("/answers", answers_routes);
router.use("/comments", comments_routes);

export default router;
