import { UserRepository } from "../repository/user.repository";
import { UserCreate } from "../types/user.type";

export class UserUsecase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register({ email, name, password }: UserCreate) {
    const user = await this.userRepository.register({ email, name, password });
    return user;
  }

  async emailExists(email: string) {
    const user = await this.userRepository.emailExists(email);
    return user;
  }
}
