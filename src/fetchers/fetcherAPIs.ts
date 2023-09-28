import { FastifyPluginAsync } from 'fastify';
import fetch from 'node-fetch';

const fetchers: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/fetcher1', async function (request, reply) {
    try {
      const coin = 'bitcoin';
      const vsCurrencies: string[] = ['usd', 'eur', 'gbp'];

      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${vsCurrencies.join(
        ',',
      )}`;
      const response = await fetch(url);
      const data = await response.json();

      return { data };
    } catch (error) {
      console.error('An error occurred:', error);
      return { error: 'An error occurred' };
    }
  });

  fastify.get('/fetcher2', async function (request, reply) {
    try {
      const coinId = 'bitcoin';
      const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;

      const response = await fetch(url);
      const data = await response.json();
      const price = data.market_data.current_price.usd;

      return { price };
    } catch (error) {
      console.error('An error occurred:', error);
      return { error: 'An error occurred' };
    }
  });
};

export default fetchers;
