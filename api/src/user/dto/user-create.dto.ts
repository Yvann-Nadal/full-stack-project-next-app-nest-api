import { IsArray, IsString, MinLength } from 'class-validator';
import { OrderCreateDto } from 'src/order/dto/order-create.dto';

export class UserCreateDto {
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

  @IsArray()
  orders: OrderCreateDto[];
}
