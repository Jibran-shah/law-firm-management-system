import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    namespace: {
      type: String,
      required: true,
    },

    storageProvider: {
      type: String,
      enum: ["s3", "cloudinary"],
      required: true,
    },

    storageKey: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    resourceType: {
      type: String,
      enum: ["image", "video", "raw"],
      default: "image",
    },

    storageMetadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

fileSchema.index(
  { storageProvider: 1, storageKey: 1 },
  { unique: true }
);

export const File = mongoose.model("File", fileSchema);