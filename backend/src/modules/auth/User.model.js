import mongoose from "mongoose";
import { USER_ROLES } from "./auth.constants.js";

const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.MEMBER,
      required: true,
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
