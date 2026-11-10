
const firmSchema = new Schema(
  {
    name: { type: String, required: true },
    
    description: { type: String, default: "" },

    contactInfo: {
      type: contactInfoSchema,
      default: () => ({}),
    },

    location: {
      coordinates: geoLocationSchema,
      address: { type: String, default: "" },
      images: [String],
    },

    combinedMembersImage: String,

    statistics: [statisticSchema],
    faqs: [faqSchema],

    timings: [
      {
        day: { type: String, required: true },
        open: String,
        close: String,
        isClosed: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

export const Firm = model("Firm", firmSchema);
