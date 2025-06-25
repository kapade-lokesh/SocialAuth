import { Router } from "express";
import { createUser, login ,profile} from "../controller/user.controller";
import { isLoggedin } from "../auth/auth";

const userRoutes = Router();

userRoutes.route("/create").post(createUser);
userRoutes.route("/login").post(login);
userRoutes.route("/profile").post(isLoggedin,profile);

export default userRoutes;
