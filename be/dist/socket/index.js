"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = __importDefault(require("./chat"));
const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log(`${socket.id} is connected`);
        (0, chat_1.default)(io, socket);
        socket.on("disconnect", () => {
            console.log(`${socket.id} is disconnected`);
        });
    });
};
exports.default = socketHandler;
