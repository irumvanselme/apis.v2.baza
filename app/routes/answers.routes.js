import { Router } from "express";
import AnswersController from "../controllers/answers.controller.js";
import {authMiddleware} from "../middlewares/auth.test.middleware.js";

const router = Router();

router.get("/:question/", AnswersController.get_all);
router.post("/:question/",authMiddleware,  AnswersController.create);
router.get("/:id", AnswersController.show);
router.put("/:id", AnswersController.update);
router.delete("/:id", AnswersController.delete);

export default router;
