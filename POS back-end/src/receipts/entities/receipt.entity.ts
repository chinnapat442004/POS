import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReceiptItem } from './receipt-item.entity';

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @OneToMany(() => ReceiptItem, (receiptItems) => receiptItems.receipt)
  receiptItems: ReceiptItem[];
}
