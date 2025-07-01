import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import authController from '../controllers/auth';

const router = Router();
router.post("/login", authController.login);
router.post("/register",authController.register);
router.get("/getUser",authMiddleware,authController.getUser);

export default router;