import { ProductDetail } from 'src/product-detail/entities/product-detail.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ProductDetail, (productDetail) => productDetail.type)
  productDetails: ProductDetail[];
}
