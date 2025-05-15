import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
// Cria uma classe que estende a classe PrismaClient e implementa a interface OnModuleInit, que será executada quando o módulo for iniciado e será usada para conectar ao banco de dados
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // Conecta ao banco de dados
    await this.$connect();
  }
}
