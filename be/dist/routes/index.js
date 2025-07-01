"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const auth_2 = __importDefault(require("./auth"));
const conversation_1 = __importDefault(require("./conversation"));
const router = (0, express_1.Router)();
router.use("/auth", auth_2.default);
router.use("/conversation", auth_1.default, conversation_1.default);
exports.default = router;
