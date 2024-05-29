import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class RawMaterial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  unit: string;

  @Column()
  minimum: number;

  @Column()
  status: string;

  @CreateDateColumn()
  create: Date;

  @UpdateDateColumn()
  update: Date;
}
