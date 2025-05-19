import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { UserService } from '../user/user.service';
import { CryptoAES } from '../util/crypto-aes';
import { PrismaService } from '../lib/prismaService';

// Módulo de contatos com controllers e providers relacionados
@Module({
  controllers: [ContactsController],
  providers: [ContactsService, UserService, CryptoAES, PrismaService],
})
export class ContactsModule {}
