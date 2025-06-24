import app from "./src/app";
import { config } from "./src/config/config";
app.listen(config.port, () => {
  console.log("app listen on port 3000");
});
