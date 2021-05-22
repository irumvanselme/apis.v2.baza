import { Router } from "express";
import CommetsController from "../controllers/comments.controller.js";
import { authMiddleware } from "../middlewares/auth.test.middleware.js";

const router = Router();

router.get("/:answer", CommetsController.get_all);
router.post("/:answer",authMiddleware,  CommetsController.create);
router.get("/:id", CommetsController.show);
router.put("/:id", CommetsController.update);
router.delete("/:id", CommetsController.delete);

export default router;
