import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bill } from './bill.entity';

@Entity()
export class BillDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Bill, (bill) => bill.billDetails)
  bill: Bill;
}
