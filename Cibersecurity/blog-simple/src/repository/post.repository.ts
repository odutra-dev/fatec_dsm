import { PostCreate, PostType } from "../types/post.type";
import { prisma } from "../lib/prisma";

export class PostRepository {
  async create(post: PostCreate): Promise<PostType> {
    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: post.authorId,
      },
    });

    return newPost;
  }

  async getAll(): Promise<PostType[]> {
    const posts = await prisma.post.findMany();
    return posts;
  }
}
