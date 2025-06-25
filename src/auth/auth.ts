import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

type DecodedUser = {
  _id: string;
  email: string;
};

const isLoggedin = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  try {
    if (!req.headers.authorization) {
      res.status(401).json({ message: "No authorization header provided" });
      return;
    }
    token = req.headers.authorization.split(" ")[1].replace(/^"|"$/g, "");

    console.log(token);
    const decoded = jwt.verify(token, config.jwt_secret) as DecodedUser;
    (req as any).user = await User.findById(decoded._id);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Not authorized, token failed" });
    return;
  }
};

export { isLoggedin };
