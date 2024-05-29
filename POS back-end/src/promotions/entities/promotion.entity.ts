import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PromotionDetail } from './promotionDetail';

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column({ default: 'Active' })
  status: string;

  @Column()
  mininum: number;

  @Column()
  maxinum: number;

  @Column('decimal', { precision: 6, scale: 2, nullable: true })
  discount_late: number;

  @Column({ nullable: true })
  discount_price: number;

  //   @Column()
  //   free_prodcut: Product;

  //   @Column()
  //   point: number;

  //   @Column()
  //   product: Product;

  @OneToMany(
    () => PromotionDetail,
    (promotionDetail) => promotionDetail.promotion,
  )
  promotionDetails: PromotionDetail[];
}
