import { IsString, MinLength } from 'class-validator';

export class UserUpdateDto {
  @MinLength(3, {
    message: 'Le nom doit contenir au moins 3 caractères',
  })
  @IsString()
  username: string;
  @IsString()
  address: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
}
