import { z } from "zod";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const imageSchema = z
  .file()
  .max(MAX_IMAGE_SIZE, "Image must be 2 MB or smaller")
  .mime(
    ["image/jpeg", "image/png", "image/webp"],
    "Only JPEG, PNG, and WebP images are allowed"
  );

export const createMemberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .max(100, "Full name cannot exceed 100 characters")
    .default(""),

  title: z
    .string()
    .trim()
    .min(2, "Professional title is required")
    .max(100, "Title cannot exceed 100 characters")
    .default(""),

  bio: z
    .string()
    .trim()
    .min(20, "Bio must be at least 20 characters")
    .max(2000, "Bio cannot exceed 2000 characters")
    .default(""),

  qualifications: z
    .string()
    .default(""),

  email: z.email("Enter a valid email address").default(""),

  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20, "Phone number is too long")
    .default(""),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(300, "Address cannot exceed 300 characters")
    .default(""),

  avatar: imageSchema.optional().default(undefined),

  cover: imageSchema.optional().default(undefined),
});