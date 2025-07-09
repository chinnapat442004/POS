import { Product } from 'src/products/entities/product.entity';
import { Size } from 'src/products/entities/size.entity';
import { Type } from 'src/products/entities/type.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class ProductDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @ManyToOne(() => Product, (product) => product.productDetails)
  product: Product;

  @ManyToOne(() => Size, (size) => size.productDetails)
  size: Size;

  @ManyToOne(() => Type, (type) => type.productDetails)
  type: Type;
}
