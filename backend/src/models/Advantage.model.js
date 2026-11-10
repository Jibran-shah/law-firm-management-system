
const advantageSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    image: String,
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Advantage = model("Advantage", advantageSchema);
