import { Schema, model } from "mongoose"
import { advantagesSchema, contactInfoSchema, faqSchema, geoLocationSchema, statisticSchema } from "../../models/SharedSchemas.js";

const lawFirmSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    combinedMembersImage: {
      type: Schema.Types.ObjectId,
      ref:"File"
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    contactInfo: {
      type: contactInfoSchema,
      default: () => ({}),
    },

    location: {
      coordinates: {
        type: geoLocationSchema,
        default: undefined,
      },

      address: {
        type: String,
        default: "",
        trim: true,
      },

      images: {
        type: [String],
        default: [],
      },
    },

    statistics: {
      type: [statisticSchema],
      default: [],
    },

    advantages: {
      type: [advantagesSchema],
      default: []
    },

    faqs: {
      type: [faqSchema],
      default: [],
    },

    timings: {
      type: [
        {
          _id: false,
          day: {
            type: String,
            required: true,
            enum: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
          },
          open: {
            type: String,
            default: "",
          },
          close: {
            type: String,
            default: "",
          },
          isClosed: {
            type: Boolean,
            default: false,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const LawFirm = model("LawFirm", lawFirmSchema);