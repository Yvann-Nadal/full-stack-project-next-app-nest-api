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
import { CategoryService } from '../service/category.service';
import { CategoryCreateDto } from '../dto/category-create.dto';
import { CategoryUpdateDto } from '../dto/category-update.dto';
import { CategoryEntity } from '../entity/category.entity';
import { DeleteResult } from 'typeorm';

// @Controller('categorys')
// est un décorateur qui permet de déclarer un controller
// donc une classe qui va contenir des routes (url accessible)
@Controller('categories')
export class CategoryController {
  // injection de dépendance
  // permet d'instancier la classe CategoryService
  // dans la propriété categoryService
  constructor(private readonly categoryService: CategoryService) {}

  // @Get() est un décorateur qui permet de déclarer
  // une route accessible avec la méthode GET
  @Get()
  getAllCategories(): Promise<CategoryEntity[]> {
    return this.categoryService.getAllcategories();
  }

  // on peut passer en parametre du décorateur
  // un segment d'url avec éventuellement des paramètres
  // on peut ensuite récupérer sa valeur avec le décorateur @Param
  @Get(':id')
  getOneCategoryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategoryEntity | null> {
    return this.categoryService.getOneCategoryById(id);
  }

  @Post()
  // on utilise le décorateur @Body pour récupérer
  // les données du body de la requête
  // on valide les données du body de la requête
  // avec un DTO (Data Transfer Object)
  createCategory(@Body() data: CategoryCreateDto): Promise<CategoryEntity> {
    return this.categoryService.createCategory(data);
  }

  @Put(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CategoryUpdateDto,
  ): Promise<CategoryEntity> {
    return this.categoryService.updateCategory(id, data);
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.categoryService.deleteCategory(id);
  }
}
