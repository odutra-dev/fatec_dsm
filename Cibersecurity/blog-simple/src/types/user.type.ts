import { z } from "zod";
import { userCreateSchema } from "../schemas/user.schema";

export type UserCreate = z.infer<typeof userCreateSchema>;
