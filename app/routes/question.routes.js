import { Router } from "express";
import QuestionController from "../controllers/question.controller.js";
import { authMiddleware } from "./../middlewares/auth.test.middleware.js";

const router = Router();

router.get("/", QuestionController.get_all);
router.post("/", authMiddleware, QuestionController.create);
router.get("/:id", QuestionController.get_one);
router.put("/:id", QuestionController.update);
router.delete("/:id", QuestionController.delete);

export default router;
