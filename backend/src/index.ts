import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import cors from "cors";
dotenv.config();
import { adminRouter } from "./routes/adminRoutes";
import { userRouter } from "./routes/userRoutes";
import { authRouter } from "./routes/authRoutes";
const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET; //TODO - what will be the fall back value here
console.log(PORT);

const app = express();
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log("Body:", req.body);
  console.log("Headers:", req.headers);
  next();
});

app.use(express.json());
app.use(cors());
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use((req, res, next) => {
  res.status(404).json({ error: "page not found" });
});
//writing on boarding routes

app.listen(PORT, () => console.log(`server is running on ${PORT}`));

//many to one relationship is ... retry to add the couse getting purchaed to that fiedl
