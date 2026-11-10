import { z } from "zod";

const contentNodeSchema = z.lazy(() =>
  z.object({
    type: z.string().trim().min(1),
    content: z.unknown().nullable().optional(),
    children: z.array(contentNodeSchema).default([]),
  })
);

export const createBlogSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(1000),
  content: contentNodeSchema.optional(),
  status: z.enum(["draft", "published"]).optional(),
});

export const updateBlogSchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    description: z.string().trim().min(1).max(1000).optional(),
    image: z.string().nullable().optional(),
    content: contentNodeSchema.optional(),
    status: z.enum(["draft", "published"]).optional(),
    publishedAt: z.coerce.date().nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const getAllBlogsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
  status: z.enum(["draft", "published"]).optional(),
  author: z.string().optional(),
});