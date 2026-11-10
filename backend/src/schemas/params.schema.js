import { z } from "zod";

export const idParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID"),
});

export const contactInfoSchema = z.object({
  whatsapp: z.string().trim().optional(),
  email: z.email().optional(),
  phoneNumbers: z.array(z.string().trim()).optional(),
});

export const geoLocationSchema = z.object({
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
});

export const statisticSchema = z.object({
  name: z.string().trim().min(1),
  value: z.string().trim().min(1),
});

export const faqSchema = z.object({
  question: z.string().trim().min(1),
  answer: z.string().trim().min(1),
});

