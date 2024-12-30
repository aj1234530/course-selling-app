import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "..";
import { signupSchema } from "../types/zodValidation";
import { authSessionMiddleware } from "../middlewares/authsession";

export const authRouter = express.Router();

authRouter.get("/authverify", authSessionMiddleware, (req, res) => {
  res.status(200);
});
authRouter.post("/user/signup", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(409).json({ message: "all field manadatory" });
      return;
    }
    // if (!(await prisma.admin.findUnique({ where: { email } }))) {
    //   res.status(409).json({ message: "please login" });
    //   return;
    // }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.user.create({
      data: { username: username, email: email, password: hashedPassword },
    }); //creating acc in db
    const id = admin.id;
    if (!JWT_SECRET) {
      throw new Error(`internal server error`);
    }
    const token = jwt.sign({ id: id }, JWT_SECRET, { expiresIn: "48h" });
    res
      .status(200)
      .json({ message: "your are now signued up with us", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

authRouter.post("/user/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const admin = await prisma.user.findFirst({ where: { email } });
    console.log(admin);
    if (!admin) {
      res
        .status(409)
        .json({ message: "you are not signed up , please sign up" });
      return;
    }
    if (!(await bcrypt.compare(password, admin.password))) {
      res.status(409).json({ message: "wrong password" });
      return;
    }
    if (!JWT_SECRET) {
      throw new Error(`internal server error`);
    }
    const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: "48h" });
    res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

//no signup route for the admin - admin account cannot be created - can
authRouter.post("/admin/signin", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const admin = await prisma.admin.findFirst({ where: { username } });
    console.log(admin);
    if (!admin) {
      res.status(409).json({
        message:
          "Wrong credentials, if you forgot the password , contact the support",
      });
      return;
    }
    //password for admin is hardcoded in the db(without hash)
    if (!(password === admin.password)) {
      res.status(409).json({ message: "wrong password" });
      return;
    }
    if (!JWT_SECRET) {
      throw new Error(`internal server error`);
    }
    const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: "48h" });
    res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});
