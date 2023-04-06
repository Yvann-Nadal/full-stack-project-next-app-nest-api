import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ProductEntity } from '../entity/product.entity';
import { ProductUpdateDto } from '../dto/product-update.dto';
import { ProductCreateDto } from '../dto/product-create.dto';

Injectable();
export class ProductService {
  constructor(
    // on "injecte" le repository de l'entité Product
    // dans la propriété productRepository de la classe ProductService
    // pour pouvoir ensuite utiliser les méthodes du repository
    // dans les méthodes de notre service
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getAllproducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find({ relations: ['category'] });
  }

  async createProduct(data: ProductCreateDto): Promise<ProductEntity> {
    try {
      return this.productRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating product');
    }
  }
  async getOneProductById(id: number): Promise<ProductEntity | null> {
    return await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async updateProduct(
    id: number,
    data: ProductUpdateDto,
  ): Promise<ProductEntity> {
    // on récupère l'product ciblé
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    // on "merge" les données du body de la requête
    // avec les données déjà présentes dans l'product
    const productUpdate = { ...product, ...data };
    // on sauvegarde l'product mis à jour
    await this.productRepository.save(productUpdate);

    return productUpdate;
  }
  async deleteProduct(id: number): Promise<DeleteResult> {
    return await this.productRepository.delete(id);
  }
}
