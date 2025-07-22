import { Server, Socket } from 'socket.io';
import jwt, { JwtPayload } from 'jsonwebtoken';
import chatHandler from './chat';

declare module 'socket.io' {
  interface Socket {
    user?: JwtPayload;
  }
}
const userSocketMap = new Map<number, string>();

const socketHandler = (io: Server) => {
  
  io.use((socket: Socket, next: any) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Token not provided"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || '');

      if (!decoded || typeof decoded !== 'object') {
        return next(new Error("Invalid token payload"));
      }
      
      socket.user = decoded; 
      next();
    } catch (error) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`${socket.id} is connected`);
    // console.log(`${socket.user?.data.id} is connected`);
    userSocketMap.set(socket.user?.data.id,socket.id); // save socket is connecting
    
    chatHandler(io, socket,userSocketMap);

    socket.on("disconnect", () => {
      console.log(`${socket.id} is disconnected`);
      // console.log(`${socket.user?.data.id} is disconnected`);
      userSocketMap.delete(socket.user?.data.id);
    });
  });
};

export default socketHandler;
