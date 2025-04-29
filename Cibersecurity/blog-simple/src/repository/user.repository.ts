import { UserCreate } from "../types/user.type";
import { prisma } from "../lib/prisma";

export class UserRepository {
  async register(user: UserCreate) {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return newUser;
  }
}
