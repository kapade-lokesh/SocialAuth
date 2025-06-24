import app from "./src/app";
import { config } from "./src/config/config";
import connectDB from "./src/config/connectDB";

//mongo connection
connectDB();

app.listen(config.port, () => {
  console.log("app listen on port 3000");
});
