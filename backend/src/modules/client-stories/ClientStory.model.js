import mongoose from "mongoose";

const clientStorySchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    story: {
      type: String,
      required: true,
      trim: true,
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      default: null,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const ClientStory = mongoose.model("ClientStory", clientStorySchema);