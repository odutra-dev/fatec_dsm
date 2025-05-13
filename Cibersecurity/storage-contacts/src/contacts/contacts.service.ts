import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { prisma } from 'src/lib/prismaClient';
import { CryptoAES } from '../util/crypto-aes';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ContactsService {
  constructor(
    private readonly crypto: CryptoAES,
    private readonly userService: UserService,
  ) {}

  async create(createContactDto: CreateContactDto) {
    const encryptedPhone = this.crypto.encrypt(createContactDto.phone);
    createContactDto.phone = encryptedPhone;

    const encryptedName = this.crypto.encrypt(createContactDto.name);
    createContactDto.name = encryptedName;

    return await prisma.contact.create({ data: createContactDto });
  }

  async findAllByUser(id: string) {
    const user = await this.userService.findOne(id);

    const contacts = await prisma.contact.findMany({
      where: { userId: user.id },
    });

    return contacts;
  }

  async findOne(id: string) {
    const contact = await prisma.contact.findUnique({ where: { id } });

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

    return await prisma.contact.update({
      where: { id },
      data: updateContactDto,
    });
  }

  async remove(id: string) {
    return await prisma.contact.delete({ where: { id } });
  }
}
