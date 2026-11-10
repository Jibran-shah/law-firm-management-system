import { Schema, model } from "mongoose";

export const contactInfoSchema = new Schema(
  {
    whatsapp: String,
    email: String,
    phoneNumbers: [String],
  },
  { _id: false }
);

export const geoLocationSchema = new Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { _id: false }
);

export const statisticSchema = new Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: true }
);

export const advantagesSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon:{
      type:Schema.Types.ObjectId,
      ref:"File"
    }
  },
  { _id: true }
);

export const faqSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: true }
);
