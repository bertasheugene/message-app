import { Router } from "express";
import { createMessage } from "../controllers/messageController";

const router = Router();

router.post("/messages", createMessage);

export default router;
