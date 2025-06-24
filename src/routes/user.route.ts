import { Router } from "express";
import { createUser } from "../controller/user.controller";

const userRoutes = Router();

userRoutes.route("/create").post(createUser);

export default userRoutes;
