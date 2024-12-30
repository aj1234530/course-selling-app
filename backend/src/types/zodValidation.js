"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourseSchema = exports.createStoreSchema = exports.signupSchema = void 0;
var zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, "username must be length 3 and above"),
    email: zod_1.z.string().email("invalid email format"),
    password: zod_1.z.string().min(6, "Password must be of length 6 and above"),
});
exports.createStoreSchema = zod_1.z.object({
    teacherName: zod_1.z.string(),
    teacherDetails: zod_1.z.string(),
    storeTitle: zod_1.z.string(),
    storeDetails: zod_1.z.string(),
});
exports.createCourseSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    teacherName: zod_1.z.string(),
});
