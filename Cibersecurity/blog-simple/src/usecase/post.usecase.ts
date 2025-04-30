import { PostRepository } from "../repository/post.repository";
import { PostCreate, PostType } from "../types/post.type";

export class PostUsecase {
  private postRepository: PostRepository;
  constructor() {
    this.postRepository = new PostRepository();
  }

  async create({ title, content, authorId }: PostCreate): Promise<PostType> {
    const post = await this.postRepository.create({ title, content, authorId });
    return post;
  }

  async getAll(): Promise<PostType[]> {
    const posts = await this.postRepository.getAll();
    return posts;
  }
}
