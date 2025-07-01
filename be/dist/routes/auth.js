"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const auth_2 = __importDefault(require("../controllers/auth"));
const router = (0, express_1.Router)();
router.post("/login", auth_2.default.login);
router.post("/register", auth_2.default.register);
router.get("/getUser", auth_1.default, auth_2.default.getUser);
exports.default = router;
