import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Promotion } from './promotion.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class PromotionDetail {
  @PrimaryGeneratedColumn()
  id: number;

  //   @Column()
  //   name: string;

  //   @Column()
  //   start_date: Date;

  //   @Column()
  //   end_date: Date;

  //   @Column()
  //   status: string;

  //   @Column()
  //   discount_late: number;

  //   @Column()
  //   discount_price: number;

  //   @Column()
  //   free_prodcut: Product;

  @ManyToOne(() => Promotion, (promotion) => promotion.promotionDetails)
  promotion: Promotion;

  @ManyToOne(() => Product, (product) => product.promotionDetails)
  product: Product;
}
