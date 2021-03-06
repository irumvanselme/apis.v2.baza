import {Router} from "express";
import QuestionController from "../controllers/question.controller";
import ActionsController from "../controllers/actions.controller";
import {authMiddleware} from "../middlewares/auth.test.middleware";

const router = Router();

router.get("/", QuestionController.get_all);
router.get("/feed", QuestionController.feed);
router.post("/", authMiddleware, QuestionController.create);
router.post("/:id", authMiddleware, ActionsController.handle_question_action);
router.get("/:id", QuestionController.get_one);
router.put("/:id", QuestionController.update);
router.delete("/:id", QuestionController.delete);

export default router;
