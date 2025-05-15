import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { fastifyCors } from '@fastify/cors';
import * as dotenv from 'dotenv';
import { RawServerDefault } from 'fastify';

// Configuração de variáveis de ambiente
dotenv.config();

// Inicialização do servidor Nest
async function bootstrap(): Promise<void> {
  // Criação da aplicação
  const app: NestFastifyApplication<RawServerDefault> =
    await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );

  // Configuração do CORS
  await app.register(fastifyCors, {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  // Configuração do Swagger
  const configSwagger: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Storage Contacts')
    .setDescription('The contacts API description')
    .setVersion('1.0')
    .build();

  // Configuração das rotas do Swagger
  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    configSwagger,
  );

  // Configuração da documentação do Swagger
  SwaggerModule.setup('api', app, document);

  // Configuração do pipe de validação de dados
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Inicialização do servidor Nest
  await app.listen(process.env.PORT ?? 3000);
}

// Inicialização do servidor Nest principal
bootstrap()
  .then(() => console.log('Server started'))
  .catch((error) => console.error(error));
