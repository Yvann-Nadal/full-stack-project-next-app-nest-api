import { IsInt, IsString, MinLength } from 'class-validator';
import { IsFile } from 'nestjs-form-data';
import { CategoryEntity } from 'src/category/entity/category.entity';

export class ProductUpdateDto {
  @MinLength(3, {
    message: 'Le nom doit contenir au moins 3 caractères',
  })
  @IsString()
  title: string;
  @IsFile()
  file: any;
  @IsInt()
  price: number;
  @IsInt()
  categoryId: CategoryEntity;
}
