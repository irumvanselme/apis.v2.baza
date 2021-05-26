import { Router } from "express";
import CommetsController from "../controllers/comments.controller.js";
import { authMiddleware } from "../middlewares/auth.test.middleware.js";

const router = Router();

/**
 * @param answer The Answer Id
 * */
router.get("/:answer", CommetsController.get_all);

/**
 * @param answer The Answer Id
 * */
router.post("/:answer",authMiddleware,  CommetsController.create);

/**
 * @param id The Comment Id
 * */
router.get("/:id", CommetsController.show);

/**
 * @param id The Comment Id
 * */
router.put("/:id", CommetsController.update);

/**
 * @param id The Comment Id
 * */
router.delete("/:id", CommetsController.delete);

export default router;
