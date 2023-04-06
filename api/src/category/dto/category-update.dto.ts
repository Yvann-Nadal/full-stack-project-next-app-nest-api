import { IsString, MinLength } from 'class-validator';

export class CategoryUpdateDto {
  @MinLength(3, {
    message: 'Le nom doit contenir au moins 3 caractères',
  })
  @IsString()
  title: string;
  @IsString()
  description: string;
}
