import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${config.mongo_uri}`);
    console.log("database connected to", connectionInstance.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
