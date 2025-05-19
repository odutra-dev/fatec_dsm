import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from './../lib/prismaService';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'crypto';

describe('UserController', () => {
  let controller: UserController;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    controller = module.get<UserController>(UserController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create user', async () => {
    const createUserDto: CreateUserDto = {
      email: 'example@example.com',
      password: 'password',
    };
    const user = {
      id: randomUUID(),
      email: 'example@example.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    prisma.user.create = jest.fn().mockResolvedValueOnce({ user });
    const result = await controller.create(createUserDto);
    expect(result).toEqual({ user });
  });

  it('should get user', async () => {
    const id = randomUUID();
    const user = {
      id,
      email: 'example@example.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    prisma.user.findUnique = jest.fn().mockResolvedValueOnce({ user });
    const result = await controller.findOne(id);
    expect(result).toEqual({ user });
  });

  it('should update user', async () => {
    const id = randomUUID();
    const updateUserDto: CreateUserDto = {
      email: 'example@example.com',
      password: 'password',
    };
    const user = {
      id,
      email: 'example@example.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    prisma.user.findUnique = jest.fn().mockResolvedValueOnce({ user });
    prisma.user.update = jest.fn().mockResolvedValueOnce({ user });
    const result = await controller.update(id, updateUserDto);
    expect(result).toEqual({ user });
  });

  it('should delete user', async () => {
    const id = randomUUID();
    prisma.user.findUnique = jest.fn().mockResolvedValueOnce({ id });
    prisma.user.delete = jest.fn().mockResolvedValueOnce({ id });
    const result = await controller.remove(id);
    expect(result).toEqual({ id });
  });
});
