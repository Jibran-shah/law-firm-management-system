import mongoose from "mongoose";

const { Schema, model } = mongoose;

const contentNodeSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },

    content: {
      type: Schema.Types.Mixed,
      default: null,
    },

    children: {
      type: [Schema.Types.Mixed],
      default: [],
    },
  },
  { _id: false }
);

contentNodeSchema.add({
  children: {
    type: [contentNodeSchema],
    default: [],
  },
});

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },

    content: {
      type: contentNodeSchema,
      default:{
        type:"default",
        content:{},
        children:[]
      }
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    publishedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const Blog = model("Blog", blogSchema);