import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Coin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  symbol!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'float' })
  total_supply!: number;
}
