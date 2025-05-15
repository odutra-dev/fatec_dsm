import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/lib/prismaService';

// Módulo de usuário com controllers e providers relacionados
@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
