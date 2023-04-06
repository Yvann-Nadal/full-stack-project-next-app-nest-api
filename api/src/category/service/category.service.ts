import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CategoryEntity } from '../entity/category.entity';
import { CategoryUpdateDto } from '../dto/category-update.dto';
import { CategoryCreateDto } from '../dto/category-create.dto';

Injectable();
export class CategoryService {
  constructor(
    // on "injecte" le repository de l'entité Category
    // dans la propriété categoryRepository de la classe CategoryService
    // pour pouvoir ensuite utiliser les méthodes du repository
    // dans les méthodes de notre service
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAllcategories(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find({ relations: ['products'] });
  }

  async createCategory(data: CategoryCreateDto): Promise<CategoryEntity> {
    try {
      return this.categoryRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating category');
    }
  }
  async getOneCategoryById(id: number): Promise<CategoryEntity | null> {
    return await this.categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  async updateCategory(
    id: number,
    data: CategoryUpdateDto,
  ): Promise<CategoryEntity> {
    // on récupère l'category ciblé
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });
    // on "merge" les données du body de la requête
    // avec les données déjà présentes dans l'category
    const categoryUpdate = { ...category, ...data };
    // on sauvegarde l'category mis à jour
    await this.categoryRepository.save(categoryUpdate);

    return categoryUpdate;
  }
  async deleteCategory(id: number): Promise<DeleteResult> {
    return await this.categoryRepository.delete(id);
  }
}
