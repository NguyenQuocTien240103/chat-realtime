import { Server, Socket } from 'socket.io';
import chatHandler from './chat';
const socketHandler = (io: Server)=>{
    io.on("connection",(socket)=>{
        console.log(`${socket.id} is connected`);
        chatHandler(io,socket);
        socket.on("disconnect",()=>{
            console.log(`${socket.id} is disconnected`);
        })
    })
}

export default socketHandler;