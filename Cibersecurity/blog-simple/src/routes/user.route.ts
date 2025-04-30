import { userCreateSchema } from "../schemas/user.schema";
import { FastifyTypedInstance } from "../types/FastifyTipeInstance";
import { UserUsecase } from "../usecase/user.usecase";

export const userRoute = (app: FastifyTypedInstance) => {
  const userUseCase = new UserUsecase();
  app.post(
    "/register",
    {
      schema: {
        description: "Cria um novo usuário",
        tags: ["User"],
        body: userCreateSchema,
      },
    },
    async (request, reply) => {
      const { email, name, password } = request.body;

      const user = await userUseCase.register({ email, name, password });
      return reply.code(201).send(user);
    }
  );
};
