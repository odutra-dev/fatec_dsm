import { ApiProperty } from '@nestjs/swagger';
import { Length, IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  @ApiProperty({ type: String, required: true, example: 'John Doe' })
  name: string;

  @IsPhoneNumber('BR')
  @ApiProperty({ type: String, required: true, example: '11999999999' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '30932ddd-95df-4649-9c05-313fc0c4f00a',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
