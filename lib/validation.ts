import { z } from "zod";

export const formValidation = z.object({
    name: z.string()
        .min(2, {message: "Username must be at least 2 characters."})
        .max(50, {message: "Username must be at most 50 characters."}),
    email:z.string().email("invalid email adress."),
    phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), {
        message: "Phone number must be a valid international number (e.g., +256 456-7890).",
      })
  })