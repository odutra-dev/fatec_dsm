import { postCreateSchema, postSchema } from "../schemas/post.schema";
import { z } from "zod";

export type PostCreate = z.infer<typeof postCreateSchema>;
export type PostType = z.infer<typeof postSchema>;
