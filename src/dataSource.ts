import { DataSource } from 'typeorm';

import { Config } from './utils/config';

export const dataSource = new DataSource({
  type: 'postgres',
  host: Config.database.host,
  port: Config.database.port,
  username: Config.database.username,
  password: Config.database.password,
  database: Config.database.name,
  synchronize: false,
  logging: false,
});
