import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { UserService } from 'src/user/user.service';
import { CryptoAES } from 'src/util/crypto-aes';
import { PrismaService } from 'src/lib/prismaService';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService, UserService, CryptoAES, PrismaService],
})
export class ContactsModule {}
