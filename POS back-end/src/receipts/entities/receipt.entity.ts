import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReceiptItem } from './receipt-item.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Member } from 'src/members/entities/member.entity';

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(() => ReceiptItem, (receiptItems) => receiptItems.receipt)
  receiptItems: ReceiptItem[];

  @ManyToOne(() => Employee, (employee) => employee.receipts)
  employee: Employee;

  @ManyToOne(() => Member, (member) => member.receipts)
  member: Member;
}
