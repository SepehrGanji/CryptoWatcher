import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './test/test.db',
  },
  useNullAsDefault: true,
};

export default config;
