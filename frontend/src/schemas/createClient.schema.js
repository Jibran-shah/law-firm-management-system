import {z} from "zod"

export const createClientSchema = z.object({
  name: z.string().trim().min(1).max(150).default(""),
  bio: z.string().trim().max(2000).optional().default(""),
  address: z.string().trim().max(200).optional().default(""),
});