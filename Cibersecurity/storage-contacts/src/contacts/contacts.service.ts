import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/lib/prismaService';
import { CryptoAES } from '../util/crypto-aes';
import { UserService } from 'src/user/user.service';

@Injectable()
// Serviço de contatos com funções relacionadas
export class ContactsService {
  // Construtor da classe ContactsService com os seguintes parâmetros, onde o primeiro recebe o CryptoAES, o segundo recebe o UserService e o terceiro recebe o PrismaService
  constructor(
    private readonly crypto: CryptoAES,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  // Função para criar um novo contato com base nos dados fornecidos
  async create(createContactDto: CreateContactDto) {
    const encryptedPhone = this.crypto.encrypt(createContactDto.phone);
    createContactDto.phone = encryptedPhone;

    // Criptografar o nome e o telefone do usuario
    const encryptedName = this.crypto.encrypt(createContactDto.name);
    createContactDto.name = encryptedName;

    // Criar o contato com os dados fornecidos e retornar o contato criado e ja criptografado
    return await this.prismaService.contact.create({ data: createContactDto });
  }

  // Função para encontrar todos os contatos de um determinado usuário
  async findAllByUser(id: string, take: number, skip: number) {
    // Buscar o usuario pelo id, usando o UserService
    const user = await this.userService.findOne(id);

    // Buscar todos os contatos do usuario com base no id e com paginação
    const contacts = await this.prismaService.contact.findMany({
      where: { userId: user.id },
      take,
      skip,
    });

    // Descriptografar os campos dos contatos encontrados
    contacts.forEach((contact) => {
      contact.name = this.crypto.decrypt(contact.name);
      contact.phone = this.crypto.decrypt(contact.phone);
    });

    // Retornar os contatos
    return contacts;
  }

  // Função para encontrar um contato por ID
  async findOne(id: string) {
    // Buscar o contato pelo id
    const contact = await this.prismaService.contact.findUnique({
      where: { id },
    });

    // Verificar se id foi fornecido, caso contrario retornar erro de bad request
    if (!id) {
      throw new BadRequestException('Id is required');
    }

    // Verificar se contato foi encontrado, caso contrario retornar erro de not found
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    // Descriptografar os campos do contato
    contact.name = this.crypto.decrypt(contact.name);
    contact.phone = this.crypto.decrypt(contact.phone);

    return contact;
  }

  // Função para atualizar um contato
  async update(id: string, updateContactDto: UpdateContactDto) {
    await this.findOne(id);

    return await this.prismaService.contact.update({
      where: { id },
      data: updateContactDto,
    });
  }

  // Função para excluir um contato
  async remove(id: string) {
    return await this.prismaService.contact.delete({ where: { id } });
  }
}
