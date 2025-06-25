import express from "express";
import userRoutes from "./routes/user.route";

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("hellow");
});
app.use("/user", userRoutes);

export default app;
