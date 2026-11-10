import {z} from "zod"
import {contactInfoSchema, geoLocationSchema, statisticSchema, faqSchema} from "../../schemas/params.schema.js"

const timingSchema = z
  .object({
    day: z.enum([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]),
    open: z.string().optional(),
    close: z.string().optional(),
    isClosed: z.preprocess(
    (value) => {
      if (value === "true") return true;
      if (value === "false") return false;
      return value;
    },
    z.boolean().optional())
  })
  .superRefine((timing, ctx) => {
    const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

    if (!timing.isClosed) {
      if (!timing.open || !timeRegex.test(timing.open)) {
        ctx.addIssue({
          code: "custom",
          path: ["open"],
          message: "Opening time must be in HH:mm format",
        });
      }

      if (!timing.close || !timeRegex.test(timing.close)) {
        ctx.addIssue({
          code: "custom",
          path: ["close"],
          message: "Closing time must be in HH:mm format",
        });
      }
    }
  });


export const updateFirmSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    description: z.string().trim().optional(),
    contactInfo: contactInfoSchema.optional(),
    location: z
      .object({
        coordinates: geoLocationSchema.optional(),
        address: z.string().trim().optional()
      })
      .optional(),

    statistics: z.array(statisticSchema).optional(),
    faqs: z.array(faqSchema).optional(),
    timings: z.array(timingSchema).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
