import { UserRepository } from "../repository/user.repository";
import { UserCreate } from "../types/user.type";

export class UserUsecase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async register({ email, name, password }: UserCreate) {
    const user = await this.userRepository.register({ email, name, password });
    return user;
  }
}
