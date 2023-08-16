import { DataSource } from 'typeorm';

import { Config } from './utils/config';

export const dataSource = new DataSource({
  type: 'postgres',
  host: Config.database.host,
  port: Config.database.port,
  username: Config.database.username,
  password: Config.database.password,
  database: Config.database.name,
  entities: [__dirname + '/db/entities/*.js'], 
  migrations: [__dirname + '/db/migrations/postgres/*.js'], 
  synchronize: false,
  logging: false,
});
