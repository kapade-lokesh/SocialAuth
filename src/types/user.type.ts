import { Document } from "mongoose";
export interface IUser extends Document {
  name?: string;
  email: string;
  password?: string; // optional for OAuth users
  provider: "credentials" | "google" | "github"; // extendable
  providerId?: string; // e.g., GitHub user ID
  avatar?: string;
}

export interface UserDocument extends IUser, Document {
  matchPassword(userpassword: string): Promise<string>;
}
