import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { PrismaService } from '../lib/prismaService';
import { CryptoAES } from '../util/crypto-aes';
import { UserService } from '../user/user.service';

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
});
