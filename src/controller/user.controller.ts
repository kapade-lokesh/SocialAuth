import { User } from "../models/user.model";
import { Request, Response } from "express";
import { userSchemaZod } from "../schema/user.schema";

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

export { createUser };
