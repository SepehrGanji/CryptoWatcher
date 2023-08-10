import { Entity, Column } from 'typeorm';
import { Coin } from './coin';

@Entity()
export class CoinPrice {
  @Column()
  id!: number;

  @Column(() => Coin)
  coin!: Coin;

  @Column()
  price!: number;
}
