import { ReceiptItem } from 'src/receipt-items/entities/receipt-item.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

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
}
