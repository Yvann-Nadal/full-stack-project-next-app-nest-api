import { OrderEntity } from 'src/order/entity/order.entity';
import { ProductEntity } from 'src/product/entity/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  quantity: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  orderId: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderItems)
  productId: ProductEntity;
}
