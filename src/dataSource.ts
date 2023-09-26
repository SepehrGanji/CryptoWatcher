import { DataSource } from 'typeorm';
import { Config } from './utils/config';
import { Coin } from './db/entities/coin'; 
import { CoinPrice } from './db/entities/coinPrice'; 
import { CreateCoinAndCoinPriceTables1631234567894 } from './db/migrations/postgres/CreateCoinAndCoinPriceTables1631234567894'

let dataSource: DataSource;
if (process.env.NODE_ENV === 'test') {
  dataSource = new DataSource({
    type: 'sqlite',
    database: Config.database.name
  });
} else {
  dataSource = new DataSource({
    type: 'postgres',
    host: Config.database.host,
    port: Config.database.port,
    username: Config.database.username,
    password: Config.database.password,
    database: Config.database.name,
    entities: [Coin, CoinPrice], 
    migrations: [ CreateCoinAndCoinPriceTables1631234567894 ],
    synchronize: false,
    logging: false,
  });
}

export { dataSource };
