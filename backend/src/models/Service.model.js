
const serviceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    categories: [{ type: String, trim: true }],
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "Member",
      },
    ],
    isPublished: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    
  },
  { timestamps: true }
);

export const Service = model("Service", serviceSchema);
