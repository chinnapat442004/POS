import { ReceiptItem } from 'src/receipt-items/entities/receipt-item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @OneToMany(() => ReceiptItem, (receiptItems) => receiptItems.receipt)
  receiptItems: ReceiptItem[];
}
