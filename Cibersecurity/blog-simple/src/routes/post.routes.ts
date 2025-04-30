import { postCreateSchema, postSchema } from "../schemas/post.schema";
import { FastifyTypedInstance } from "../types/FastifyTipeInstance";
import { PostUsecase } from "../usecase/post.usecase";

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
      const post = await postUseCase.create({
        title,
        content,
        authorId: request.user.id,
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
};
