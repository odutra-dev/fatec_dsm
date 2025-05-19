import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from './../lib/prismaService';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw BadRequestException when id is null', async () => {
    const id = '';
    await expect(service.findOne(id)).rejects.toThrow(BadRequestException);
  });

  it('should throw NotFoundException when user is not found', async () => {
    const id = randomUUID();
    prisma.user.findUnique = jest.fn().mockResolvedValueOnce(null);
    await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
  });

  it('should return user when user is found', async () => {
    const id = randomUUID();
    prisma.user.findUnique = jest.fn().mockResolvedValueOnce({ id });
    const result = await service.findOne(id);
    expect(result).toEqual({ id });
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
    const result = await service.findOne(id);
    expect(result).toEqual({ user });
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
    const result = await service.create(createUserDto);
    expect(result).toEqual({ user });
  });

  it('should update user', async () => {
    const id = randomUUID();
    const updateUserDto: UpdateUserDto = {
      email: 'example@example.com',
      password: 'password',
    };
    prisma.user.findUnique = jest.fn().mockResolvedValueOnce({ id });
    prisma.user.update = jest.fn().mockResolvedValueOnce({ id });
    const result = await service.update(id, updateUserDto);
    expect(result).toEqual({ id });
  });

  it('should delete user', async () => {
    const id = randomUUID();
    prisma.user.findUnique = jest.fn().mockResolvedValueOnce({ id });
    prisma.user.delete = jest.fn().mockResolvedValueOnce({ id });
    const result = await service.remove(id);
    expect(result).toEqual({ id });
  });
});
