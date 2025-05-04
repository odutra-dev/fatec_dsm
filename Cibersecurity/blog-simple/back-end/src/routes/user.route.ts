import z from "zod";
import { userCreateSchema, userLoginSchema } from "../schemas/user.schema";
import { FastifyTypedInstance } from "../types/FastifyTipeInstance";
import { UserUsecase } from "../usecase/user.usecase";
import { hashPassword } from "../util/hash";

export const userRoute = async (app: FastifyTypedInstance) => {
  const userUseCase = new UserUsecase();

  app.addHook(
    "onRequest",

    async (request, reply) => {
      try {
        if (request.method === "GET") {
          await request.jwtVerify();
        }
      } catch (error) {
        reply.code(403).send(error);
      }
    }
  );

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

  app.get(
    "/user/:id",
    {
      schema: {
        description: "Get a user by id",
        tags: ["User"],
        headers: z.object({
          authorization: z.string().regex(/^Bearer\s.+$/, {
            message: "Authorization header must start with 'Bearer '",
          }),
        }),
        params: z.object({
          id: z.string().transform(Number),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const user = await userUseCase.getById(id);

      if (!user) {
        return reply.code(404).send({ message: "User not found" });
      }

      return reply.code(200).send(user);
    }
  );
};
