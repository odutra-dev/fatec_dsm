import { userCreateSchema } from "../schemas/user.schema";
import { FastifyTypedInstance } from "../types/FastifyTipeInstance";

export const userRoute = (app: FastifyTypedInstance) => {
  app.post("/register", {
    schema: {
      description: "Cria um novo usuário",
      tags: ["User"],
      body: userCreateSchema,

    }
  }, async (request, reply) => {
    
  });
};
