import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { PrismaService } from '../lib/prismaService';
import { CryptoAES } from '../util/crypto-aes';
import { UserService } from '../user/user.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

describe('ContactsService', () => {
  let service: ContactsController;
  let prisma: PrismaService;
  let cryptoAES: CryptoAES;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [ContactsService, PrismaService, CryptoAES, UserService],
    }).compile();

    service = module.get<ContactsController>(ContactsController);
    prisma = module.get<PrismaService>(PrismaService);
    cryptoAES = module.get<CryptoAES>(CryptoAES);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw BadRequestException when id is null', async () => {
    const id = '';
    await expect(service.findOne(id)).rejects.toThrow(BadRequestException);
  });

  it('should throw NotFoundException when contact is not found', async () => {
    const id = randomUUID();
    prisma.contact.findUnique = jest.fn().mockResolvedValueOnce(null);
    await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
  });

  it('should return contact when contact is found', async () => {
    const id = randomUUID();
    const contact = {
      id,
      name: 'encryptedName',
      phone: 'encryptedPhone',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prisma.contact.findUnique = jest.fn().mockResolvedValueOnce(contact);

    // Mock da descriptografia
    jest.spyOn(cryptoAES, 'decrypt').mockImplementation((value) => {
      if (value === 'encryptedName') return 'John Doe';
      if (value === 'encryptedPhone') return '11999999999';
      return value;
    });

    const result = await service.findOne(id);

    expect(result).toEqual({
      ...contact,
      name: 'John Doe',
      phone: '11999999999',
    });
  });

  it('should throw BadRequestException when userId is null', async () => {
    const userId = '';
    const take = 10;
    const skip = 0;

    await expect(service.findAllByUser(userId, take, skip)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw NotFoundException when user is not found', async () => {
    const userId = randomUUID();
    const take = 10;
    const skip = 0;

    prisma.user.findUnique = jest.fn().mockResolvedValueOnce(null);

    await expect(service.findAllByUser(userId, take, skip)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return contacts when user is found', async () => {
    const userId = randomUUID();
    const take = 10;
    const skip = 0;

    prisma.user.findUnique = jest.fn().mockResolvedValueOnce({ id: userId });

    const contacts = [
      {
        id: randomUUID(),
        name: 'encryptedName',
        phone: 'encryptedPhone',
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        name: 'encryptedName',
        phone: 'encryptedPhone',
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    prisma.contact.findMany = jest.fn().mockResolvedValueOnce(contacts);

    // Mock da descriptografia
    jest.spyOn(cryptoAES, 'decrypt').mockImplementation((value) => {
      if (value === 'encryptedName') return 'John Doe';
      if (value === 'encryptedPhone') return '11999999999';
      return value;
    });

    const result = await service.findAllByUser(userId, take, skip);

    expect(result).toEqual([
      {
        ...contacts[0],
        name: 'John Doe',
        phone: '11999999999',
      },
      {
        ...contacts[1],
        name: 'John Doe',
        phone: '11999999999',
      },
    ]);
  });

  it('should throw NotFoundException when contact is not found', async () => {
    const id = randomUUID();
    prisma.contact.findUnique = jest.fn().mockResolvedValueOnce(null);
    await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
  });

  it('should create contact', async () => {
    const userId = randomUUID();
    const createContactDto: CreateContactDto = {
      name: 'John Doe',
      phone: '11999999999',
      userId,
    };

    // Mock da criptografia
    cryptoAES.encrypt = jest
      .fn()
      .mockImplementationOnce(() => 'encryptedPhone')
      .mockImplementationOnce(() => 'encryptedName');

    const contact = {
      id: randomUUID(),
      name: 'encryptedName',
      phone: 'encryptedPhone',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    prisma.user.findUnique = jest.fn().mockResolvedValueOnce({ id: userId });
    prisma.contact.create = jest.fn().mockResolvedValueOnce(contact);

    const result = await service.create(createContactDto);

    expect(cryptoAES.encrypt).toHaveBeenCalledWith('John Doe');
    expect(cryptoAES.encrypt).toHaveBeenCalledWith('11999999999');
    expect(prisma.contact.create).toHaveBeenCalledWith({
      data: {
        name: 'encryptedName',
        phone: 'encryptedPhone',
        userId,
      },
    });
    expect(result).toEqual(contact);
  });

  it('should update contact', async () => {
    const id = randomUUID();
    const userId = randomUUID();
    const updateContactDto: UpdateContactDto = {
      name: 'John Doe',
      phone: '11999999999',
      userId,
    };
    prisma.contact.findUnique = jest.fn().mockResolvedValueOnce({ id });
    prisma.contact.update = jest.fn().mockResolvedValueOnce({ id });
    const result = await service.update(id, updateContactDto);
    expect(result).toEqual({ id });
  });

  it('should delete contact', async () => {
    const id = randomUUID();
    prisma.contact.findUnique = jest.fn().mockResolvedValueOnce({ id });
    prisma.contact.delete = jest.fn().mockResolvedValueOnce({ id });
    const result = await service.remove(id);
    expect(result).toEqual({ id });
  });
});
