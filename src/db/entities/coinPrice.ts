import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Coin } from './coin';

@Entity()
export class CoinPrice {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column(() => Coin)
  coin!: Coin;

  @Column({ type: 'decimal' })
  price!: number;
}
