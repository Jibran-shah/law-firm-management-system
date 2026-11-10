import { z } from "zod";

export const createClientStorySchema = z.object({
  title: z.string().trim().min(1).max(200),
  story: z.string().trim().min(1).max(10000),
  service: z.string().nullable().optional(),
  isPublished: z.boolean().optional(),
});

export const updateClientStorySchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    story: z.string().trim().min(1).max(10000).optional(),
    service: z.string().nullable().optional(),
    isPublished: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const getAllClientStoriesSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
  client: z.string().optional(),
  service: z.string().optional(),
  isPublished: z.enum(["true", "false"]).optional(),
});