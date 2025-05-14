import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @Length(3, 100)
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, example: 'example@example.com' })
  email: string;

  @Length(8, 20)
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, required: true, example: 'password' })
  password: string;
}
