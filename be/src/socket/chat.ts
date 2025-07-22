import { Server, Socket } from 'socket.io';
import { Message, Conversation } from '../types';
import conversationService from '../services/conversation';

const chatHandler =  (io: Server, socket : Socket, userSocketMap: Map<number, string>) =>{
    socket.on("joinRoom", (roomId: number) => {
        socket.join(roomId.toString());
    });
    socket.on("sendMessage", async (message : Message)=>{ 
        try {
            await conversationService.addMessage(message);
        } catch (error: any) {
            io.to(message.roomId.toString()).emit("receiveNewMessage",{
                ...message,
                content: error.message,
            });
            return;
        }
        io.to(message.roomId.toString()).emit("receiveNewMessage",message);
        // logic update conversation list
        const userRooms =  await conversationService.getUserRoom(message.roomId);
        const userInRoom = userRooms.find((ur) => ur.userId !== message.user.id);

        if (!userInRoom) return;

        const userSocketId = userSocketMap.get(userInRoom.userId);
        const conversation: Conversation = {
            user: {
                id: message.user.id,
                email: message.user.email,
                avatar: message.user.avatar || '',
            },
            lastMessage: message.content,
            lastMessageAt: message.createAt?.toString(),
            roomId: message.roomId.toString(),
        }

        if (userSocketId) {
            io.to(userSocketId).emit("updateListConversation", conversation);
        }

        socket.emit("updateListConversation", {
            ...conversation,
            user: {
                id: userInRoom.user.id,
                email: userInRoom.user.email || '',
                avatar: userInRoom.user.avatar || '',
            },
        });
    }) 
    socket.on("leaveRoom", (roomId: number) => {
        socket.leave(roomId.toString());
    });
}

export default chatHandler;