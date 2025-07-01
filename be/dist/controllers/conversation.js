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
const entity_1 = require("../validates/entity");
const conversation_1 = __importDefault(require("../services/conversation"));
const conversationController = {
    getList: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const jwtPayload = req.user;
            if (!jwtPayload || !jwtPayload.data) {
                return res.status(401).json({ error: "Unauthorized: Missing or invalid token data" });
            }
            const user = jwtPayload.data;
            const listConversation = yield conversation_1.default.getList(user);
            return res.status(200).json({ message: "GetListConverstion is successfull", data: listConversation });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }),
    getDetail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const jwtPayload = req.user;
            if (!jwtPayload || !jwtPayload.data) {
                return res.status(401).json({ error: "Unauthorized: Missing or invalid token data" });
            }
            const user = jwtPayload.data;
            const result = entity_1.entitySchema.safeParse(req.body);
            if (!result.success) {
                return res.status(400).json({ errors: result.error });
            }
            let entity = result.data;
            const conversationDetail = yield conversation_1.default.getDetail(user, entity);
            return res.status(200).json({ message: "GetDetailConverstion is successfull", data: conversationDetail });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }),
    getPrivateRoomDetail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const jwtPayload = req.user;
            if (!jwtPayload || !jwtPayload.data) {
                return res.status(401).json({ error: "Unauthorized: Missing or invalid token data" });
            }
            const user = jwtPayload.data;
            const result = entity_1.entitySchema.safeParse(req.body);
            if (!result.success) {
                return res.status(400).json({ errors: result.error });
            }
            let entity = result.data;
            const conversationDetail = yield conversation_1.default.getPrivateRoomDetail(user, entity);
            return res.status(200).json({ message: "GetPrivateRoomDetail is successfull", data: conversationDetail });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }),
};
exports.default = conversationController;
