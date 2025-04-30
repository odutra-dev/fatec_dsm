import { UserRepository } from "../repository/user.repository";
import { UserCreate, userLogin, userType } from "../types/user.type";

export class UserUsecase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register({ email, name, password }: UserCreate): Promise<userType> {
    const user = await this.userRepository.register({ email, name, password });
    return user;
  }

  async emailExists(email: string): Promise<boolean> {
    const exists = await this.userRepository.emailExists(email);

    return exists;
  }

  async login({ email, password }: userLogin): Promise<userType> {
    const emailExists = await this.userRepository.emailExists(email);

    if (!emailExists) {
      throw new Error("Email not found");
    }

    const user = await this.userRepository.login({ email, password });

    return user;
  }
}
