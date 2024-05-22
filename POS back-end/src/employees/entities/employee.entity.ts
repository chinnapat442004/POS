import { Branch } from 'src/branches/entities/branch.entity';
import { Receipt } from 'src/receipts/entities/receipt.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column({ default: 'noimage.jpg' })
  image: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(() => Receipt, (receipt) => receipt.employee)
  receipts: Receipt[];

  @ManyToOne(() => Branch, (branch) => branch.employees)
  branch: Branch;
}
