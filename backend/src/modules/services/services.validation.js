import { z } from "zod";

export const createServiceSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(5000),
  isActive: z.preprocess(
    (value) => {
      if (value === "true") return true;
      if (value === "false") return false;
      return value;
    },
    z.boolean().optional())
});

export const updateServiceSchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),

    description: z.string().trim().min(1).max(5000).optional(),

    image: z.string().nullable().optional(),

    isActive: z.preprocess(
      (value) => {
        if (value === "true") return true;
        if (value === "false") return false;
        return value;
      },
      z.boolean().optional())
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const getAllServicesSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  search: z.string().trim().optional(),

  isActive: z.enum(["true", "false"]).optional(),
});