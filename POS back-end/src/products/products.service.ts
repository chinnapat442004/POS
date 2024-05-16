import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    const product = new Product();
    product.name = createProductDto.name;
    product.price = parseFloat(createProductDto.price);
    if (createProductDto.image && createProductDto.image !== '') {
      product.image = createProductDto.image;
    }
    product.category = createProductDto.category;
    return this.productsRepository.save(product);
  }

  findAll() {
    return this.productsRepository.find();
  }

  findOne(id: number) {
    return this.productsRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOneOrFail({
      where: { id },
    });

    product.name = updateProductDto.name;
    product.price = parseFloat(updateProductDto.price);
    product.category = updateProductDto.category;
    if (product.image && product.image != '') {
      product.image = updateProductDto.image;
    }
    product.image = updateProductDto.image;
    return this.productsRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.productsRepository.findOneOrFail({
      where: { id },
    });

    return this.productsRepository.remove(product);
  }

  async getTopProduct() {
    return await this.productsRepository.query(`
    SELECT productId, name,SUM(receipt_item.quantity)AS qty
    FROM  receipt_item 
    INNER JOIN product ON receipt_item.productId = product.id
   GROUP BY productId
    ORDER BY qty DESC
    LIMIT 5;`);
  }
}
