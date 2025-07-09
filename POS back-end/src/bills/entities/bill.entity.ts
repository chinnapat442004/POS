import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BillDetail } from './billDetail.entity';

@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => BillDetail, (billDetails) => billDetails.bill)
  billDetails: BillDetail[];

  //   @OneToMany(() => ReceiptItem, (receiptItems) => receiptItems.receipt, {
  //     onDelete: 'CASCADE',
  //   })
  //   receiptItems: ReceiptItem[]
}
