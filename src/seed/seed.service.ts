/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productRespository: ProductsService) {}
  async runSeed() {
    await this.insertNewProducts();
    return 'execute seed';
  }

  private async insertNewProducts() {
    await this.productRespository.deleteAllProducts();

    const products = initialData.products;

    const insertPromises = [];

    products.forEach((product) => {
      this.productRespository.create(product);
    });

    await Promise.all(insertPromises);
  }
}
