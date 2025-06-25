import { Router } from "express";
import { createUser, login } from "../controller/user.controller";

const userRoutes = Router();

userRoutes.route("/create").post(createUser);
userRoutes.route("/login").post(login);

export default userRoutes;
