import { z } from "zod";

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string().nullable(),
  authorId: z.number(),
  createdAt: z.date(),
});

export const postCreateSchema = z.object({
  title: z.string(),
  content: z.string(),
  authorId: z.number(),
});
