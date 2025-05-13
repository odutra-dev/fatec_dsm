import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { prisma } from 'src/lib/prismaClient';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    return await prisma.user.create({ data: createUserDto });
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('Id is required');
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    return await prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: string) {
    await this.findOne(id);

    return await prisma.user.delete({ where: { id } });
  }
}
