import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserUpdateDto } from '../dto/user-update.dto';
import { UserCreateDto } from '../dto/user-create.dto';

Injectable();
export class UserService {
  constructor(
    // on "injecte" le repository de l'entité User
    // dans la propriété userRepository de la classe UserService
    // pour pouvoir ensuite utiliser les méthodes du repository
    // dans les méthodes de notre service
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllusers(): Promise<UserEntity[]> {
    return await this.userRepository.find({ relations: ['orders'] });
  }

  async createUser(data: UserCreateDto): Promise<UserEntity> {
    try {
      return this.userRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating user');
    }
  }
  async getOneUserById(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
  }

  async updateUser(id: number, data: UserUpdateDto): Promise<UserEntity> {
    // on récupère l'user ciblé
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
    // on "merge" les données du body de la requête
    // avec les données déjà présentes dans l'user
    const userUpdate = { ...user, ...data };
    // on sauvegarde l'user mis à jour
    await this.userRepository.save(userUpdate);

    return userUpdate;
  }
  async deleteUser(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
