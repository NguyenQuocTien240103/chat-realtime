"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entitySchema = void 0;
const zod_1 = require("zod");
exports.entitySchema = zod_1.z.object({
    entityId: zod_1.z.number(),
});
