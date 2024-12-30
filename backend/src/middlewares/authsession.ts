import expess, { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "..";
export const authSessionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; //Was stuck here for 30 min cause of small a//if one of the properties in the chain is null or undefined if authobject dne then undefined else split
    console.log("token received", token);
    if (!token) {
      res.status(409).json({ message: "unauthorized" });
      console.log("sdflksdjflsf"); ///comment
      return;
    }
    if (!JWT_SECRET) {
      throw new Error("internal server error");
    }
    console.log(jwt.verify(token, JWT_SECRET));
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    req.userId = decoded.id;
    console.log(req.userId);
    next();
  } catch (error: any) {
    //TODO - any type - fix it
    console.log(error);
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Access token has expired." });
      return;
    }
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid access token." });
      return;
    }
    res.status(500).json({ message: "Internal server error." });
    return;
  }
};

//2 things to note
//1. declaring global and namespace for express
//2. as syntax for getting decoded
