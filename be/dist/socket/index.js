"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const chat_1 = __importDefault(require("./chat"));
const userSocketMap = new Map();
const socketHandler = (io) => {
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error("Token not provided"));
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
            if (!decoded || typeof decoded !== 'object') {
                return next(new Error("Invalid token payload"));
            }
            socket.user = decoded;
            next();
        }
        catch (error) {
            next(new Error("Unauthorized"));
        }
    });
    io.on("connection", (socket) => {
        var _a;
        console.log(`${socket.id} is connected`);
        // console.log(`${socket.user?.data.id} is connected`);
        userSocketMap.set((_a = socket.user) === null || _a === void 0 ? void 0 : _a.data.id, socket.id); // save socket is connecting
        (0, chat_1.default)(io, socket, userSocketMap);
        socket.on("disconnect", () => {
            var _a;
            console.log(`${socket.id} is disconnected`);
            // console.log(`${socket.user?.data.id} is disconnected`);
            userSocketMap.delete((_a = socket.user) === null || _a === void 0 ? void 0 : _a.data.id);
        });
    });
};
exports.default = socketHandler;
