import { email, z } from "zod"
import { emailSchema, passwordSchema } from "./shared.schema"

export const signupSchema = z.object({
  username: z.string().min(8,"username must be 8 characters long").default(),
  email: emailSchema,
  newPassword: passwordSchema,
  confirmPassword: passwordSchema
})
.refine((data)=>data.confirmPassword === data.newPassword, {
  error:"passwords doesn't match",
  path:["confirmPassword"]
})
.transform((data)=>({
  username:data.username,
  email:data.email,
  password:data.newPassword
}))