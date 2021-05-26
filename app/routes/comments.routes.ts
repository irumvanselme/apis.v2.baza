import { Router } from "express";
import CommentsController from "../controllers/comments.controller";
import { authMiddleware } from "../middlewares/auth.test.middleware";

const router = Router();

/**
 * @param answer The Answer Id
 * */
router.get("/:answer", CommentsController.get_all);

/**
 * @param answer The Answer Id
 * */
router.post("/:answer",authMiddleware,  CommentsController.create);

/**
 * @param id The Comment Id
 * */
router.get("/:id", CommentsController.show);

/**
 * @param id The Comment Id
 * */
router.put("/:id", CommentsController.update);

/**
 * @param id The Comment Id
 * */
router.delete("/:id", CommentsController.delete);

export default router;
