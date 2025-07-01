import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import authRouter from "./auth"
import conversationRouter from "./conversation"
const router = Router();
router.use("/auth", authRouter);
router.use("/conversation",authMiddleware,conversationRouter);

export default router;