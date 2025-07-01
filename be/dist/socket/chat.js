"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chatHandler = (io, socket) => {
    // socket.on("joinRoom",(roomId: number)=>{
    //     socket.join(roomId.toString());
    // })
    // socket.on("sendMessage",(roomId: number, message: string)=>{
    //     io.to(roomId.toString()).emit("receiveMessage",message);
    // })
    socket.on("sendMessage", (obj) => {
        // io.to(roomId.toString()).emit("receiveMessage",message);
        console.log(obj);
        io.emit("receiveNewMessage", obj);
    });
};
exports.default = chatHandler;
