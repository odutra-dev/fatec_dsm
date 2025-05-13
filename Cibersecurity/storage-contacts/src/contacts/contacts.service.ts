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
export class ContactsService {
  constructor(
    private readonly crypto: CryptoAES,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  async create(createContactDto: CreateContactDto) {
    const encryptedPhone = this.crypto.encrypt(createContactDto.phone);
    createContactDto.phone = encryptedPhone;

    const encryptedName = this.crypto.encrypt(createContactDto.name);
    createContactDto.name = encryptedName;

    return await this.prismaService.contact.create({ data: createContactDto });
  }

  async findAllByUser(id: string, take: number, skip: number) {
    const user = await this.userService.findOne(id);

    const contacts = await this.prismaService.contact.findMany({
      where: { userId: user.id },
      take,
      skip,
    });

    contacts.forEach((contact) => {
      contact.name = this.crypto.decrypt(contact.name);
      contact.phone = this.crypto.decrypt(contact.phone);
    });

    return contacts;
  }

  async findOne(id: string) {
    const contact = await this.prismaService.contact.findUnique({
      where: { id },
    });

    if (!id) {
      throw new BadRequestException('Id is required');
    }

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    // Descriptografar os campos
    contact.name = this.crypto.decrypt(contact.name);
    contact.phone = this.crypto.decrypt(contact.phone);

    return contact;
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    await this.findOne(id);

    return await this.prismaService.contact.update({
      where: { id },
      data: updateContactDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.contact.delete({ where: { id } });
  }
}
