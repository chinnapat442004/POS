import { Member } from 'src/members/entities/member.entity';
import { Product } from 'src/products/entities/product.entity';
import { Receipt } from 'src/receipts/entities/receipt.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ReceiptItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  total: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(() => Product, (product) => product.receiptItems)
  product: Product;

  @ManyToOne(() => Receipt, (receipt) => receipt.receiptItems)
  receipt: Receipt;
}
