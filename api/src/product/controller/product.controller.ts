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
import { ProductService } from '../service/product.service';
import { ProductCreateDto } from '../dto/product-create.dto';
import { ProductUpdateDto } from '../dto/product-update.dto';
import { ProductEntity } from '../entity/product.entity';
import { DeleteResult } from 'typeorm';

// @Controller('products')
// est un décorateur qui permet de déclarer un controller
// donc une classe qui va contenir des routes (url accessible)
@Controller('products')
export class ProductController {
  // injection de dépendance
  // permet d'instancier la classe ProductService
  // dans la propriété productService
  constructor(private readonly productService: ProductService) {}

  // @Get() est un décorateur qui permet de déclarer
  // une route accessible avec la méthode GET
  @Get()
  getAllProducts(): Promise<ProductEntity[]> {
    return this.productService.getAllproducts();
  }

  // on peut passer en parametre du décorateur
  // un segment d'url avec éventuellement des paramètres
  // on peut ensuite récupérer sa valeur avec le décorateur @Param
  @Get(':id')
  getOneProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductEntity | null> {
    return this.productService.getOneProductById(id);
  }

  @Post()
  // on utilise le décorateur @Body pour récupérer
  // les données du body de la requête
  // on valide les données du body de la requête
  // avec un DTO (Data Transfer Object)
  createProduct(@Body() data: ProductCreateDto): Promise<ProductEntity> {
    return this.productService.createProduct(data);
  }

  @Put(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ProductUpdateDto,
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(id, data);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.productService.deleteProduct(id);
  }
}
