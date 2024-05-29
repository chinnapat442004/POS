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
  before_total: number;

  @Column('decimal', { precision: 6, scale: 2 })
  discount: number;

  @Column()
  after_total: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(() => ReceiptItem, (receiptItems) => receiptItems.receipt, {
    onDelete: 'CASCADE',
  })
  receiptItems: ReceiptItem[];

  @ManyToOne(() => Employee, (employee) => employee.receipts, {
    onDelete: 'CASCADE',
  })
  employee: Employee;

  @ManyToOne(() => Member, (member) => member.receipts, { onDelete: 'CASCADE' })
  member: Member;
}
