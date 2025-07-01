"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z
    .object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    confirmPassword: zod_1.z
        .string()
        .min(6),
})
    .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
