
const clientStorySchema = new Schema(
  {
    clientName: { type: String, required: true },
    profession: String,
    image: String,

    title: { type: String, required: true },
    description: { type: String, required: true },

    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
      index: true,
    },

    member: {
      type: Schema.Types.ObjectId,
      ref: "Member",
    },

    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ClientStory = model(
  "ClientStory",
  clientStorySchema
);
