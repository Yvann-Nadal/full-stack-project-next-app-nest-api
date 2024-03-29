import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { OrderCreateDto } from '../dto/order-create.dto';
import { OrderUpdateDto } from '../dto/order-update.dto';
import { OrderEntity } from '../entity/order.entity';
import { DeleteResult } from 'typeorm';

// @Controller('orders')
// est un décorateur qui permet de déclarer un controller
// donc une classe qui va contenir des routes (url accessible)
@Controller('orders')
export class OrderController {
  // injection de dépendance
  // permet d'instancier la classe OrderService
  // dans la propriété orderService
  constructor(private readonly orderService: OrderService) {}

  // @Get() est un décorateur qui permet de déclarer
  // une route accessible avec la méthode GET
  @Get()
  getAllOrders(): Promise<OrderEntity[]> {
    return this.orderService.getAllorders();
  }

  // on peut passer en parametre du décorateur
  // un segment d'url avec éventuellement des paramètres
  // on peut ensuite récupérer sa valeur avec le décorateur @Param
  @Get(':id')
  getOneOrderById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OrderEntity | null> {
    return this.orderService.getOneOrderById(id);
  }

  @Post()
  // on utilise le décorateur @Body pour récupérer
  // les données du body de la requête
  // on valide les données du body de la requête
  // avec un DTO (Data Transfer Object)
  createOrder(@Body() data: OrderCreateDto): Promise<OrderEntity> {
    return this.orderService.createOrder(data);
  }

  @Put(':id')
  updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: OrderUpdateDto,
  ): Promise<OrderEntity> {
    return this.orderService.updateOrder(id, data);
  }

  @Delete(':id')
  deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.orderService.deleteOrder(id);
  }
}
