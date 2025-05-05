import { z } from "zod";
import {
  userCreateSchema,
  userLoginSchema,
  userSchema,
} from "../schemas/user.schema";

export type UserCreate = z.infer<typeof userCreateSchema>;
export type userLogin = z.infer<typeof userLoginSchema>;
export type userType = z.infer<typeof userSchema>;
