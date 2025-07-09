import { PromotionDetail } from 'src/promotions/entities/promotionDetail';
import { ReceiptItem } from 'src/receipts/entities/receipt-item.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProductDetail } from 'src/product-detail/entities/product-detail.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column({ default: 'noimage.jpg' })
  image: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(() => ReceiptItem, (receiptItem) => receiptItem.product)
  receiptItems: ReceiptItem[];

  @OneToMany(() => ProductDetail, (productDetail) => productDetail.product)
  productDetails: ProductDetail[];

  @OneToMany(
    () => PromotionDetail,
    (promotionDetail) => promotionDetail.product,
  )
  promotionDetails: PromotionDetail[];

  // @ManyToMany(() => Size)
  // @JoinTable()
  // sizes: Size[];

  // @ManyToMany(() => Type)
  // @JoinTable()
  // types: Type[];
}
