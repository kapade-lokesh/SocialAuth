import express from "express";
import userRoutes from "./routes/user.route";
import { googleLogin } from "./controller/user.controller";

const app = express();

app.use(express.json());

app.use("/auth/google/callback", googleLogin);

app.get("/", (req, res) => {
  res.send("hellow");
});
app.use("/user", userRoutes);

export default app;
