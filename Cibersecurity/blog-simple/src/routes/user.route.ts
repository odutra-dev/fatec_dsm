import { userCreateSchema, userLoginSchema } from "../schemas/user.schema";
import { FastifyTypedInstance } from "../types/FastifyTipeInstance";
import { UserUsecase } from "../usecase/user.usecase";
import { hashPassword } from "../util/hash";

export const userRoute = (app: FastifyTypedInstance) => {
  const userUseCase = new UserUsecase();
  app.post(
    "/register",
    {
      schema: {
        description: "Create a new user",
        tags: ["User"],
        body: userCreateSchema,
      },
    },
    async (request, reply) => {
      const { email, name, password } = request.body;

      if (await userUseCase.emailExists(email)) {
        return reply.code(409).send({ message: "Email already exists" });
      }

      const hashedPassword = await hashPassword(password);

      const user = await userUseCase.register({
        email,
        name,
        password: hashedPassword,
      });
      return reply.code(201).send(user);
    }
  );

  app.post(
    "/login",
    {
      schema: {
        description: "Login a user",
        tags: ["User"],
        body: userLoginSchema,
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;

      const user = await userUseCase.login({ email, password });

      const token = app.jwt.sign({
        id: user.id,
        email: user.email,
      });

      return reply.code(200).send({
        token,
      });
    }
  );
};
