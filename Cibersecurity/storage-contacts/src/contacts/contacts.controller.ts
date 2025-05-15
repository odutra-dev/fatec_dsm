import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  // Rota de criação de contato
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @Get(':id')
  // Rota de busca de contato por ID
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(id);
  }

  @Get('findAllByUser/:id')
  // Rota de busca de contatos por usuário
  @HttpCode(HttpStatus.OK)
  findAllByUser(
    @Param('id') id: string,
    @Query('limit') take: number,
    @Query('page') skip: number,
  ) {
    skip = skip - 1;

    return this.contactsService.findAllByUser(id, take, skip);
  }

  @Patch(':id')
  // Rota de atualização de contato
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(id, updateContactDto);
  }

  @Delete(':id')
  // Rota de exclusão de contato
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.contactsService.remove(id);
  }
}
