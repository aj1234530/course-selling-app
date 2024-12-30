import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(3, "username must be length 3 and above"),
  email: z.string().email("invalid email format"),
  password: z.string().min(6, "Password must be of length 6 and above"),
});
export const createStoreSchema = z.object({
  teacherName: z.string(),
  teacherDetails: z.string(),
  storeTitle: z.string(),
  storeDetails: z.string(),
});
export const createCourseSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  teacherName: z.string(),
});
