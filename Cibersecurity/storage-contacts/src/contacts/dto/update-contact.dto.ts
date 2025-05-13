import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto extends PartialType(CreateContactDto) {
  @ApiProperty({ type: String, required: true, example: 'John Doe' })
  name: string;

  @ApiProperty({ type: String, required: true, example: '11999999999' })
  phone: string;
  @ApiProperty({
    type: String,
    required: true,
    example: '30932ddd-95df-4649-9c05-313fc0c4f00a',
  })
  userId: string;
}
