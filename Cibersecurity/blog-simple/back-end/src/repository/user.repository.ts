import { UserCreate, userLogin, userType } from "../types/user.type";
import { prisma } from "../lib/prisma";
import { verifyPassword } from "../util/hash";

export class UserRepository {
  async register(user: UserCreate): Promise<userType> {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return newUser;
  }

  async emailExists(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return !!user;
  }

  async login(user: userLogin): Promise<userType> {
    const findUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!findUser) {
      throw new Error("Email not found");
    }

    const passwordMatch = await verifyPassword(
      user.password,
      findUser.password
    );

    if (!passwordMatch) {
      throw new Error("Password is invalid");
    }

    return findUser;
  }

  async getById(id: number): Promise<userType | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }
}
