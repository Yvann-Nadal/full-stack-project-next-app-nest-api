import { IsInt, MinLength } from 'class-validator';
import { OrderEntity } from 'src/order/entity/order.entity';
import { ProductEntity } from 'src/product/entity/product.entity';

export class OrderItemUpdateDto {
  @MinLength(3, {
    message: 'Le nom doit contenir au moins 3 caractères',
  })
  orderId: OrderEntity;
  productId: ProductEntity;
  @IsInt()
  quantity: number;
}
