import { z } from "zod";

export const updateFirmSchema = z.object({
  name: z.string().trim().optional().default(""),

  description: z.string().trim().optional().default(""),

  contactInfo: z
    .object({
      whatsapp: z.string().optional().default(""),
      email: z.string().optional().default(""),
      phoneNumbers: z.array(z.string()).optional().default([]),
    })
    .optional()
    .default({}),

  location: z.object({
      coordinates: z.object({
          latitude: z.number().optional(),
          longitude: z.number().optional(),
        })
        .optional()
        .default({}),
      address: z.string().trim().optional().default(""),
      images: z.array(z.any()).optional().default([]),
    })
    .optional()
    .default({}),

  combinedMembersImage: z.any().nullable().optional().default(null),

  statistics: z.array(z.any()).optional().default([]),

  faqs: z.array(z.any()).optional().default([]),

  timings: z.array(z.any()).optional().default([]),
});