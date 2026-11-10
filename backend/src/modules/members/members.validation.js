import { z } from "zod";
import { contactInfoSchema, geoLocationSchema } from "../../schemas/params.schema.js";

export const createMemberSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),

  professionalTitle: z.string().trim().optional(),

  contactInfo: contactInfoSchema.optional(),

  bio: z.string().trim().optional(),

  qualifications: z.string().trim().optional(),

  location: z
    .object({
      coordinates: geoLocationSchema.optional(),
      address: z.string().trim().optional(),
      images: z.array(z.string().url()).optional(),
    })
    .optional(),
});


export const updateMemberSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").optional(),

    professionalTitle: z.string().trim().optional(),

    contactInfo: contactInfoSchema.optional(),

    bio: z.string().trim().optional(),

    qualifications: z.string().trim().optional(),

    location: z
      .object({
        coordinates: geoLocationSchema.optional(),
        address: z.string().trim().optional(),
        images: z.array(z.string().url()).optional(),
      })
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });