import { z } from "zod";

export const userCreateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});
