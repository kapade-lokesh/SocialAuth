import dotenv from "dotenv";
dotenv.config();
const _config = {
  port: process.env.PORT as string,
  mongo_uri: process.env.MONGO_URI!,
  jwt_secret: process.env.JWT_SECRET!,
  jwt_expiry: process.env.JWT_EXPIRY!,
  google_id: process.env.GOOGLE_CLIENT_ID!,
  google_secret: process.env.GOOGLE_CLIENT_SECRET!,
  googel_callback: process.env.GOOGLE_CALLBACK!,
};

export const config = Object.freeze(_config);
