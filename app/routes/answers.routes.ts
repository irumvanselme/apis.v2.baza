import { Router } from "express";
import AnswersController from "../controllers/answers.controller";
import ActionsController from "../controllers/actions.controller";
import { authMiddleware } from "../middlewares/auth.test.middleware";

const router = Router();

/**
 * @param question The Question Id
 * */
router.get("/:question", AnswersController.get_all);

/**
 * @param question The Question Id
 * */
router.post("/:question", authMiddleware, AnswersController.create);

/**
 * @param id AnswersId
 * */
router.get("/:id", AnswersController.show);

/**
 * @param id AnswerId
 * @param action Either upvote or downvote
 * */
router.post("/:id/:action", authMiddleware, ActionsController.handle_answer_action);

/**
 * @param id AnswerId
 * */
router.put("/:id", AnswersController.update);

/**
 * @param id AnswerId
 * */
router.delete("/:id", AnswersController.delete);

export default router;
