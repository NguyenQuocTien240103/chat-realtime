import { Router } from 'express';
import conversationController from '../controllers/conversation';

const router = Router();
router.get("/getList", conversationController.getList);
router.post("/getDetail",conversationController.getDetail);
router.post("/getPrivateRoomDetail",conversationController.getPrivateRoomDetail);

export default router;