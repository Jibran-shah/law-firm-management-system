import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, "username must be at least 2 characters")
    .max(100, "userame cannot exceed 100 characters"),

  email: z
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot exceed 100 characters"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});