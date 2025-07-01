import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { registerSchema, loginSchema } from "../validates/auth"

const authController = {
    login: async (req: Request, res: Response, next: NextFunction) => {
            
    },
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            registerSchema.parse(req.body)
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ errors: error.errors });
            }
        }
    },
}


export default authController;