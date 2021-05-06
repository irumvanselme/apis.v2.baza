import { Router } from "express";
import QuestionController from "../controllers/question.controller.js";

const router = Router();

router.get("/", QuestionController.get_all);

export default router;
