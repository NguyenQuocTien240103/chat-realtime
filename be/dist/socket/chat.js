"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_1 = __importDefault(require("../services/conversation"));
const chatHandler = (io, socket, userSocketMap) => {
    socket.on("joinRoom", (roomId) => {
        socket.join(roomId.toString());
    });
    socket.on("sendMessage", (message) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            yield conversation_1.default.addMessage(message);
        }
        catch (error) {
            io.to(message.roomId.toString()).emit("receiveNewMessage", Object.assign(Object.assign({}, message), { content: error.message }));
            return;
        }
        io.to(message.roomId.toString()).emit("receiveNewMessage", message);
        // logic update conversation list
        const userRooms = yield conversation_1.default.getUserRoom(message.roomId);
        const userInRoom = userRooms.find((ur) => ur.userId !== message.user.id);
        if (!userInRoom)
            return;
        const userSocketId = userSocketMap.get(userInRoom.userId);
        const conversation = {
            user: {
                id: message.user.id,
                email: message.user.email,
                avatar: message.user.avatar || '',
            },
            lastMessage: message.content,
            lastMessageAt: (_a = message.createAt) === null || _a === void 0 ? void 0 : _a.toString(),
            roomId: message.roomId.toString(),
        };
        if (userSocketId) {
            io.to(userSocketId).emit("updateListConversation", conversation);
        }
        socket.emit("updateListConversation", Object.assign(Object.assign({}, conversation), { user: {
                id: userInRoom.user.id,
                email: userInRoom.user.email || '',
                avatar: userInRoom.user.avatar || '',
            } }));
    }));
    socket.on("leaveRoom", (roomId) => {
        socket.leave(roomId.toString());
    });
};
exports.default = chatHandler;
