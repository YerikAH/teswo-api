/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly productRespository: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async runSeed() {
    await this.deleteTables();
    await this.insertNewProducts();
    return 'execute seed';
  }

  private async deleteTables() {
    await this.productRespository.deleteAllProducts();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {}

  private async insertNewProducts() {
    await this.productRespository.deleteAllProducts();

    const products = initialData.products;

    const insertPromises = [];

    // products.forEach((product) => {
    //   insertPromises.push(this.productRespository.create(product));
    // });

    await Promise.all(insertPromises);

    return true;
  }
}
