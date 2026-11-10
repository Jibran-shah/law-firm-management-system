import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      sparse: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },

    cover: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },

    bio: {
      type: String,
      trim: true,
      default: "",
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

export const Client = mongoose.model("Client", clientSchema);