import { Router } from "express";
import TopicController from "../controllers/TopicController.js";

const router = Router();

router.get("/", TopicController.get_all);
router.get("/:id", TopicController.get_one);
router.post("/", TopicController.create);
router.put("/:id", TopicController.edit);
router.delete("/:id", TopicController.delete);

export default router;
