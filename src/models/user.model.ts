import mongoose, { Schema, Model, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, UserDocument } from "../types/user.type";

const userSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    provider: {
      type: String,
      required: true,
      default: "credentials",
      enum: ["credentials", "google", "github"],
    },
    providerId: { type: String },
    avatar: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (this: UserDocument, next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password!, 10);
  next();
});

userSchema.methods.matchPassword = async function (
  this: UserDocument,
  userpassword: string
) {
  return await bcrypt.compare(userpassword, this.password!);
};

export const User = model<IUser, Model<UserDocument>>("User", userSchema);
