import { IsInt, MinLength } from 'class-validator';
import { OrderEntity } from 'src/order/entity/order.entity';
import { ProductEntity } from 'src/product/entity/product.entity';

export class OrderItemCreateDto {
  @IsInt()
  quantity: number;

  @MinLength(1)
  product: ProductEntity;

  @MinLength(1)
  order: OrderEntity;
}
