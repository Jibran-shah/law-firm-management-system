import { z } from "zod"

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const passwordSchema = z
    .string()
    .min(8, "password must be atleast 8 characters long")
    .regex(passwordRegex,"'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    .default("")

export const emailSchema = z
    .email("provide a valid email.")
    .default("")