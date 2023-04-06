import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { OrderEntity } from '../entity/order.entity';
import { OrderUpdateDto } from '../dto/order-update.dto';
import { OrderCreateDto } from '../dto/order-create.dto';

Injectable();
export class OrderService {
  constructor(
    // on "injecte" le repository de l'entité Order
    // dans la propriété orderRepository de la classe OrderService
    // pour pouvoir ensuite utiliser les méthodes du repository
    // dans les méthodes de notre service
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async getAllorders(): Promise<OrderEntity[]> {
    return await this.orderRepository.find({ relations: ['orderItems'] });
  }

  async createOrder(data: OrderCreateDto): Promise<OrderEntity> {
    try {
      return this.orderRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating order');
    }
  }
  async getOneOrderById(id: number): Promise<OrderEntity | null> {
    return await this.orderRepository.findOne({
      where: { id },
      relations: ['orderItems'],
    });
  }

  async updateOrder(id: number, data: OrderUpdateDto): Promise<OrderEntity> {
    // on récupère l'order ciblé
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderItems'],
    });
    // on "merge" les données du body de la requête
    // avec les données déjà présentes dans l'order
    const orderUpdate = { ...order, ...data };
    // on sauvegarde l'order mis à jour
    await this.orderRepository.save(orderUpdate);

    return orderUpdate;
  }
  async deleteOrder(id: number): Promise<DeleteResult> {
    return await this.orderRepository.delete(id);
  }
}
