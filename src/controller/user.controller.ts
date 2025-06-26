import { User } from "../models/user.model";
import { Request, Response } from "express";
import { userSchemaZod } from "../schema/user.schema";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import axios from "axios";

const createUser = async (req: Request, res: Response): Promise<void> => {
  const result = userSchemaZod.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: result.error.flatten().fieldErrors });
    return;
  }

  try {
    const newUser = await User.create(result.data);
    res.status(201).json({ message: "User created", user: newUser });
    return;
  } catch (error: any) {
    res.status(201).json({ message: error.message, user: {} });
    return;
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({ message: "Please provide valid credentils" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const authToken = jwt.sign(
      { _id: user._id, email: user.email },
      config.jwt_secret,
      {
        expiresIn: config.jwt_expiry as unknown as string | number,
      }
    );

    res.status(200).json({
      message: "login success",
      loginUser: {
        user: { name: user.name, email: user.email, provider: user.provider },
        authToken,
      },
    });
  } catch (error: any) {
    res.status(201).json({ message: error.message, user: {} });
    return;
  }
};

const profile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;

    const info = await User.findById(user._id).select("-password");

    if (!info) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "Profile",
      user: { _id: info?._id, name: info?.name, email: info?.email },
    });
    return;
  } catch (error: any) {
    res.status(201).json({ message: error.message, user: {} });
    return;
  }
};

const googleLogin = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  try {
    if (!code) res.status(400).json({ message: "Code required" });
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: config.google_id,
        client_secret: config.google_secret,
        redirect_uri: config.googel_callback,
        grant_type: "authorization_code",
      }
    );

    const { access_token } = tokenResponse.data;

    if (!access_token) {
      res.status(400).json({ message: "Token exchange failed" });
      return;
    }

     

    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const { email, name, picture } = userInfoResponse.data;

    if (!email) {
      res.status(400).json({ message: "Email not found in Google profile" });
      return;
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name,
        avatar: picture,
        provider: "google",
      });
    }

    const authToken = jwt.sign(
      { _id: user._id, email: user.email },
      config.jwt_secret,
      {
        expiresIn: config.jwt_expiry as unknown as string | number,
      }
    );

    res.json({
      success: true,
      authToken,
      user,
    });
    return;
  } catch (error: any) {
    console.error(
      "❌ Google login error:",
      error?.response?.data || error.message
    );
    res.status(500).json({ message: error.message, user: {} });
    return;
  }
};

export { createUser, login, profile, googleLogin };
