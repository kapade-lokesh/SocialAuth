import { User } from "../models/user.model";
import { Request, Response } from "express";
import { userSchemaZod } from "../schema/user.schema";
import jwt from "jsonwebtoken";

const createUser = async (req: Request, res: Response): Promise<void> => {
  const result = userSchemaZod.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: result.error.flatten().fieldErrors });
    return;
  }

  try {
    const newUser = await User.create(result.data);
    res.status(201).json({ message: "User created", user: newUser });
  } catch (error: any) {
    res.status(201).json({ message: error.message, user: {} });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
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
    {
      _id: user._id,
      email: user.email,
    },
    "asdsd"
  );

  res.status(200).json({
    message: "login success",
    loginUser: {
      user: { name: user.name, email: user.email, provider: user.provider },
      authToken,
    },
  });
};

export { createUser, login };
