import { DataSource } from 'typeorm';

import { Config } from './utils/config';

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
    synchronize: false,
    logging: false,
  });
}

export { dataSource };
