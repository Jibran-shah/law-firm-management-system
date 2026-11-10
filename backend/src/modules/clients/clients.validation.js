import { z } from "zod";

export const createClientSchema = z.object({
  name: z.string().trim().min(1).max(150),
  bio: z.string().trim().max(2000).optional(),
  address: z.string().trim().max(200).optional(),
});

export const updateClientSchema = z
  .object({
    name: z.string().trim().min(1).max(150).optional(),
    bio: z.string().trim().max(2000).optional(),
    address: z.string().trim().max(200).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const getAllClientsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  search: z.string().trim().optional(),
});