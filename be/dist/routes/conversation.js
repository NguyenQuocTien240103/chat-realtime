"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conversation_1 = __importDefault(require("../controllers/conversation"));
const router = (0, express_1.Router)();
router.get("/getList", conversation_1.default.getList);
router.post("/getDetail", conversation_1.default.getDetail);
router.post("/getPrivateRoomDetail", conversation_1.default.getPrivateRoomDetail);
exports.default = router;
