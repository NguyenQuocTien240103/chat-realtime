import { Server, Socket } from 'socket.io';

const chatHandler = (io: Server, socket : Socket) =>{
    // socket.on("joinRoom",(roomId: number)=>{
    //     socket.join(roomId.toString());
    // })
    // socket.on("sendMessage",(roomId: number, message: string)=>{
    //     io.to(roomId.toString()).emit("receiveMessage",message);
    // })

    socket.on("sendMessage",(obj)=>{
        // io.to(roomId.toString()).emit("receiveMessage",message);
        console.log(obj);
        io.emit("receiveNewMessage", obj);

    })
}

export default chatHandler;