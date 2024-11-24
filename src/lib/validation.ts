import { z } from "zod";

// Define your Zod validation schema
export const signInSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long").nonempty("Password is required"),
});

export type SignInForm = z.infer<typeof signInSchema>;
