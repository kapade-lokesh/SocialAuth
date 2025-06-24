import { IUser } from "../types/user.type";
import mongoose, { Schema, Model, model } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // only for credentials-based users
    provider: {
      type: String,
      required: true,
      default: "credentials",
      enum: ["credentials", "google", "github"],
    },  
    providerId: { type: String }, // e.g., GitHub or Google ID
    avatar: { type: String },
  },
  { timestamps: true }
);

export const User: Model<IUser> = mongoose.model("User", userSchema);
