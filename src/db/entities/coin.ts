import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Coin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}
