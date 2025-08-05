import { Request, Response, NextFunction } from 'express';
import { registerSchema, loginSchema } from "../validates/auth"
import authService from '../services/auth';

const authController = {
    login: async (req: Request, res: Response): Promise<any> => {
        try {
            const result  = loginSchema.safeParse(req.body);

            if(!result.success) return res.status(400).json({ errors: result.error });

            const user = result.data;
            const userData = await authService.login(user);
            return res.status(200).json({ message: "Login is successfull", data: userData});
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    },
    register: async (req: Request, res: Response):  Promise<any> => {
        try {
            const result  = registerSchema.safeParse(req.body);

            if(!result.success) return res.status(400).json({ error: result.error });
            
            const { confirmPassword, ...user } = result.data;
            const userData = await authService.register(user);
            return res.status(201).json({ message: "Register is successfull", data: userData});
        } catch (error: any) {

            if (error.message === "Email is exist") return res.status(400).json({ message: error.message });

            return res.status(500).json({ message: error.message });
        }
    },
    getUser: async (req: Request, res: Response):  Promise<any> => {
        try {
            const jwtPayload = req.user;

            if (!jwtPayload || !jwtPayload.data) {
                return res.status(401).json({ message: "Unauthorized: Missing or invalid token data" });
            }
            
            const user = jwtPayload.data;
            const userData = await authService.getUser(user);
            return res.status(200).json({ message: "Get user is successfull", data: userData});
        } catch (error: any) {
            return res.status(500).json({ message: error.message });   
        }
    },
}

export default authController;