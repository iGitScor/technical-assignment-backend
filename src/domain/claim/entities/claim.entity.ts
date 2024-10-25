import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Customer } from '../../../domain/customer/entities/customer.entity';

@Entity()
export class Claim {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'int' })
  pointValue: number;

  @ManyToOne(() => Customer, (customer) => customer.claims)
  customer: Customer;
}