import { z } from "zod";
import { postCreateSchema, postSchema } from "../schemas/post.schema";
import { FastifyTypedInstance } from "../types/FastifyTipeInstance";
import { PostUsecase } from "../usecase/post.usecase";

const schema = z.object({
  id: z.number(),
});

type UserToken = z.infer<typeof schema>;

export const postRoute = async (app: FastifyTypedInstance) => {
  const postUseCase = new PostUsecase();

  app.addHook(
    "onRequest",

    async (request, reply) => {
      try {
        if (request.method === "POST") {
          await request.jwtVerify();
        }
      } catch (error) {
        reply.code(403).send(error);
      }
    }
  );

  app.post(
    "/post",
    {
      schema: {
        description: "Create a new post",
        tags: ["Post"],
        body: postCreateSchema.omit({ authorId: true }),
      },
    },
    async (request, reply) => {
      const { title, content } = request.body;
      const user = request.user as UserToken;
      const post = await postUseCase.create({
        title,
        content,
        authorId: user.id,
      });
      return reply.code(201).send(post);
    }
  );

  app.get(
    "/post",
    {
      schema: {
        description: "Get all posts",
        tags: ["Post"],
      },
    },
    async (request, reply) => {
      const posts = await postUseCase.getAll();
      return reply.code(200).send(posts);
    }
  );

  app.get(
    "/post/:id",
    {
      schema: {
        description: "Get a post by id",
        tags: ["Post"],
        params: z.object({ id: z.string() }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const post = await postUseCase.getById(Number(id));
      return reply.code(200).send(post);
    }
  );
};
