import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Claim } from '../../../domain/claim/entities/claim.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Claim, (claim) => claim.customer)
  claims: Claim[];
}