import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

// DTO de atualização de usuário
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ type: String, required: true, example: 'example@example.com' })
  email: string;

  @ApiProperty({ type: String, required: true, example: 'password' })
  password: string;
}
