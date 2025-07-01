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
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const auth_1 = require("../validates/auth");
const authController = {
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    }),
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            auth_1.registerSchema.parse(req.body);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({ errors: error.errors });
            }
        }
    }),
};
exports.default = authController;
