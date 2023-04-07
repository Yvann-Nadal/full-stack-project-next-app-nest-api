import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { OrderItemEntity } from '../entity/orderItem.entity';
import { OrderItemUpdateDto } from '../dto/orderItem-update.dto';
import { OrderItemCreateDto } from '../dto/orderItem-create.dto';

Injectable();
export class OrderItemService {
  constructor(
    // on "injecte" le repository de l'entité OrderItem
    // dans la propriété orderitemRepository de la classe OrderItemService
    // pour pouvoir ensuite utiliser les méthodes du repository
    // dans les méthodes de notre service
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  async getAllOrderItems(): Promise<OrderItemEntity[]> {
    return await this.orderItemRepository.find({
      relations: ['order', 'product'],
    });
  }

  async createOrderItem(data: OrderItemCreateDto): Promise<OrderItemEntity> {
    try {
      return this.orderItemRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating orderItem');
    }
  }
  async getOneOrderItemById(id: number): Promise<OrderItemEntity | null> {
    return await this.orderItemRepository.findOne({
      where: { id },
      relations: ['order', 'product'],
    });
  }

  async updateOrderItem(
    id: number,
    data: OrderItemUpdateDto,
  ): Promise<OrderItemEntity> {
    // on récupère l'orderitem ciblé
    const orderItem = await this.orderItemRepository.findOne({
      where: { id },
      relations: ['order', 'product'],
    });
    // on "merge" les données du body de la requête
    // avec les données déjà présentes dans l'orderitem
    const orderItemUpdate = { ...orderItem, ...data };
    // on sauvegarde l'orderitem mis à jour
    await this.orderItemRepository.save(orderItemUpdate);

    return orderItemUpdate;
  }
  async deleteOrderItem(id: number): Promise<DeleteResult> {
    return await this.orderItemRepository.delete(id);
  }
}
