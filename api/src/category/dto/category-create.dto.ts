import { IsArray, IsString, MinLength } from 'class-validator';
import { ProductCreateDto } from 'src/product/dto/product-create.dto';

export class CategoryCreateDto {
  @MinLength(3, {
    message: 'Le nom doit contenir au moins 3 caractères',
  })
  @IsString()
  title: string;
  @IsString()
  description: string;

  @IsArray()
  products: ProductCreateDto[];
}
