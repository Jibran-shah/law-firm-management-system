import mongoose  from "mongoose";
import { contactInfoSchema, geoLocationSchema } from "../../models/SharedSchemas.js";

const Schema = mongoose.Schema;
const model = mongoose.model;

const memberSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    name: { type: String, required: true },
    
    professionalTitle: String,

    contactInfo: contactInfoSchema,

    bio: String,
    qualifications: String,

    avatar: {
      type: Schema.Types.ObjectId,
      ref:"File"
    },
    
    cover: {
      type: Schema.Types.ObjectId,
      ref:"File"
    },

    location: {
      coordinates: geoLocationSchema,
      address: String,
      images: [String],
    },

    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
      },
    ],

    clientStories: [
      {
        type: Schema.Types.ObjectId,
        ref: "ClientStory",
      },
    ],

    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Member = model("Member", memberSchema);
