import fp from 'fastify-plugin';

/* eslint-disable */
export interface SupportPluginOptions {}
/* eslint-enable */

export default fp<SupportPluginOptions>(async (fastify, opts) => {
  fastify.decorate('someSupport', function () {
    return 'hugs';
  });
});

declare module 'fastify' {
  export interface FastifyInstance {
    someSupport(): string;
  }
}
