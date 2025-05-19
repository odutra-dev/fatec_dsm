import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { PrismaService } from '../lib/prismaService';
import { CryptoAES } from '../util/crypto-aes';
import { UserService } from '../user/user.service';

describe('ContactsController', () => {
  let controller: ContactsController;
  let prisma: PrismaService;
  let cryptoAES: CryptoAES;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [ContactsService, PrismaService, CryptoAES, UserService],
    }).compile();

    controller = module.get<ContactsController>(ContactsController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
