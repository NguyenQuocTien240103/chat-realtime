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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../validates/auth");
const auth_2 = __importDefault(require("../services/auth"));
const authController = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = auth_1.loginSchema.safeParse(req.body);
            if (!result.success) {
                return res.status(400).json({ errors: result.error });
            }
            const user = result.data;
            const userData = yield auth_2.default.login(user);
            return res.status(200).json({ message: "Login is successfull", data: userData });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }),
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = auth_1.registerSchema.safeParse(req.body);
            if (!result.success) {
                return res.status(400).json({ error: result.error });
            }
            const _a = result.data, { confirmPassword } = _a, user = __rest(_a, ["confirmPassword"]);
            const userData = yield auth_2.default.register(user);
            return res.status(201).json({ message: "Register is successfull", data: userData });
        }
        catch (error) {
            if (error.message === "Email is exist") {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }),
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const jwtPayload = req.user;
            if (!jwtPayload || !jwtPayload.data) {
                return res.status(401).json({ error: "Unauthorized: Missing or invalid token data" });
            }
            const user = jwtPayload.data;
            const userData = yield auth_2.default.getUser(user);
            return res.status(200).json({ message: "Get user is successfull", data: userData });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }),
};
exports.default = authController;
