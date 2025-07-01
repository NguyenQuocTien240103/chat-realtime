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
const models_1 = __importDefault(require("../models"));
const library_1 = require("@prisma/client/runtime/library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authService = {
    login: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield models_1.default.user.findFirst({
                where: {
                    email: data.email,
                    password: data.password,
                },
            });
            if (!user) {
                throw new Error("Invalid credentials");
            }
            const { password } = user, userData = __rest(user, ["password"]); // remove field password
            const token = jsonwebtoken_1.default.sign({ data: userData }, process.env.JWT_SECRET || "", {
                expiresIn: "7h",
            });
            const result = Object.assign(Object.assign({}, userData), { token });
            return result;
        }
        catch (error) {
            throw new Error("Login is fail");
        }
    }),
    register: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield models_1.default.user.create({
                data,
            });
            const { password } = user, userData = __rest(user, ["password"]); // remove field password
            return userData;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new Error("Email is exist");
                }
            }
            throw new Error("Register is fail");
        }
    }),
    getUser: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield models_1.default.user.findFirst({
                where: {
                    id: data.id,
                },
                select: {
                    id: true,
                    avatar: true,
                    email: true,
                }
            });
            if (!user) {
                throw new Error("Get user is fail");
            }
            return user;
        }
        catch (error) {
            throw new Error("Get user is fail");
        }
    }),
};
exports.default = authService;
