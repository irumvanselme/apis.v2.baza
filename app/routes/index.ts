import {Router} from "express";
import topic_routes from "./topic.routes.js";
import question_routes from "./question.routes";
import answers_routes from "./answers.routes";
import comments_routes from "./comments.routes";

const router = Router();

router.use("/topics", topic_routes);
router.use("/questions", question_routes);
router.use("/answers", answers_routes);
router.use("/comments", comments_routes);

export default router;
