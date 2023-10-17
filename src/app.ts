import { join } from 'path';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
import { DBActions } from './db/DBActions'; 
import { dataSource } from './dataSource';

export type AppOptions = Partial<AutoloadPluginOptions>;

const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts,
): Promise<void> => {
  fastify.log.info('Initializing the dataSource...');
  await dataSource.initialize();
  await dataSource.runMigrations();
  fastify.log.info('Initializing the dataSource...OK');

  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  });

  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  });

  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'fetchers'),
    options: opts,
  });
};

export const dbinstance = new DBActions();
export default app;
export { app, options };
