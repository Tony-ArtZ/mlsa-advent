import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  rollNumber: z
    .string({
      required_error: "Roll number is required",
    })
    .min(5, "Roll number must be 8 digits"),
});

export type UserDetails = z.infer<typeof userSchema>;
