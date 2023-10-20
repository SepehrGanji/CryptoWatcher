import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CoinPrice {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'integer'})
  coin_id!: number;

  @Column({ type: 'float' })
  price!: number;
}
