import { DataSource } from 'typeorm';
import { Config } from './utils/config';

export const dataSource = process.env.NODE_ENV === 'test' ? createTestDataSource() : createProductionDataSource();

function createProductionDataSource() {
  return new DataSource({
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

function createTestDataSource() {
  return new DataSource({
    type: 'sqlite',
    database: './test/test.db', // Change this path to your desired location for the test SQLite database file
    synchronize: true,
    logging: false,
  });
}
