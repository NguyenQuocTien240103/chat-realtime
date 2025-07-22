import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
      interface Request {
        user?: JwtPayload
      }
    }
  }
  
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    
    if (!decoded || typeof decoded !== 'object') {
      res.status(401).json({ error: 'Invalid token payload' });
      return;
    }

    req.user = decoded;
    next();
  } catch (error: any) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
};

export default authMiddleware;
