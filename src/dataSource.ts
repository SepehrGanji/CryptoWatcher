import { DataSource } from 'typeorm';
import { Config } from './utils/config';
import { Coin } from './db/entities/coin'; 
import { CoinPrice } from './db/entities/coinPrice'; 

export const dataSource = new DataSource({
  type: 'postgres',
  host: Config.database.host,
  port: Config.database.port,
  username: Config.database.username,
  password: Config.database.password,
  database: Config.database.name,
  entities: [Coin, CoinPrice], 
  migrations: [__dirname + '/db/migrations/postgres/*.js'],
  synchronize: false,
  logging: false,
});
