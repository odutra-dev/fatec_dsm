import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { prisma } from 'src/lib/prismaClient';

@Injectable()
export class ContactsService {
  async create(createContactDto: CreateContactDto) {
    return await prisma.contact.create({ data: createContactDto });
  }

  async findOne(id: string) {
    const contacts = await prisma.contact.findUnique({ where: { id } });

    if (!id) {
      throw new BadRequestException('Id is required');
    }

    if (!contacts) {
      throw new NotFoundException('Contact not found');
    }

    return contacts;
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
