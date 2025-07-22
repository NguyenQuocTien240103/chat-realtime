import { Request, Response, NextFunction } from 'express';
import { entitySchema } from '../validates/entity';
import conversationService from '../services/conversation'; 

const conversationController = {
    getList: async (req: Request, res: Response): Promise<any> => { 
        try {
            const jwtPayload = req.user;

            if (!jwtPayload || !jwtPayload.data) {
                return res.status(401).json({ error: "Unauthorized: Missing or invalid token data" });
            }
        
            const user = jwtPayload.data;
            const listConversation = await conversationService.getList(user);
            
            return res.status(200).json({ message:"GetListConverstion is successfull", data: listConversation});
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    },
    getDetail: async (req: Request, res: Response):  Promise<any> => {
        try {
            const { cursor } = req.query;
            const jwtPayload = req.user;

            if (!jwtPayload || !jwtPayload.data) {
                return res.status(401).json({ error: "Unauthorized: Missing or invalid token data" });
            }
            
            const user = jwtPayload.data;
            const result = entitySchema.safeParse(req.body);

            if(!result.success){
                return res.status(400).json({ errors: result.error });
            }

            let entity = result.data;
            const conversationDetail = await conversationService.getDetail(user,entity,Number(cursor));
          
            return res.status(200).json({ message:"GetDetailConverstion is successfull", data: conversationDetail});
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    },
}

export default conversationController;