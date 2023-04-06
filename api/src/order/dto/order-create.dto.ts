import { IsArray, IsInt, IsString, MinLength } from 'class-validator';
import { OrderItemCreateDto } from 'src/orderItem/dto/orderItem-create.dto';

export class OrderCreateDto {
  @MinLength(3, {
    message: 'Le nom doit contenir au moins 3 caractères',
  })
  @IsInt()
  user_id: number;
  @IsString()
  status: string;
  @IsInt()
  amount: number;

  @IsArray()
  orderItems: OrderItemCreateDto[];
}
