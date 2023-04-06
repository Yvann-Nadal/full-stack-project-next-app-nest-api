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
import { OrderItemService } from '../service/orderItem.service';
import { OrderItemCreateDto } from '../dto/orderItem-create.dto';
import { OrderItemUpdateDto } from '../dto/orderItem-update.dto';
import { OrderItemEntity } from '../entity/orderItem.entity';
import { DeleteResult } from 'typeorm';

// @Controller('orderitems')
// est un décorateur qui permet de déclarer un controller
// donc une classe qui va contenir des routes (url accessible)
@Controller('orderItems')
export class OrderItemController {
  // injection de dépendance
  // permet d'instancier la classe OrderItemService
  // dans la propriété orderitemService
  constructor(private readonly orderItemService: OrderItemService) {}

  // @Get() est un décorateur qui permet de déclarer
  // une route accessible avec la méthode GET
  @Get()
  getAllOrderItems(): Promise<OrderItemEntity[]> {
    return this.orderItemService.getAllOrderItems();
  }

  // on peut passer en parametre du décorateur
  // un segment d'url avec éventuellement des paramètres
  // on peut ensuite récupérer sa valeur avec le décorateur @Param
  @Get(':id')
  getOneOrderItemById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OrderItemEntity | null> {
    return this.orderItemService.getOneOrderItemById(id);
  }

  @Post()
  // on utilise le décorateur @Body pour récupérer
  // les données du body de la requête
  // on valide les données du body de la requête
  // avec un DTO (Data Transfer Object)
  createOrderItem(@Body() data: OrderItemCreateDto): Promise<OrderItemEntity> {
    return this.orderItemService.createOrderItem(data);
  }

  @Put(':id')
  updateOrderItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: OrderItemUpdateDto,
  ): Promise<OrderItemEntity> {
    return this.orderItemService.updateOrderItem(id, data);
  }

  @Delete(':id')
  deleteOrderItem(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return this.orderItemService.deleteOrderItem(id);
  }
}
