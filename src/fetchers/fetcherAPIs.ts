import { FastifyPluginAsync } from 'fastify';
import fetch from 'node-fetch';

interface Fetcher2Response {
  market_data: {
    current_price: {
      usd: number;
      eur: number;
      gbp: number;
    };
  };
}

const fetchers: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  ///we can use one of the fetchers
  //number1
  fastify.get('/fetcher1', async function (request, reply) {
    try {
      const coin = 'bitcoin';
      const vsCurrencies: string[] = ['usd', 'eur', 'gbp'];

      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${vsCurrencies.join(',')}`;
      const response = await fetch(url);
      const data = await response.json();

      return { data };
    } catch (error) {
      console.error('An error occurred:', error);
      return { error: 'An error occurred' };
    }
  });

  //number2
  fastify.get('/fetcher2', async function (request, reply) {
    try {
      const coinId = 'bitcoin';
      const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;

      const response = await fetch(url);
      const price = (await response.json()) as Fetcher2Response;

      return { price };
    } catch (error) {
      console.error('An error occurred:', error);
      return { error: 'An error occurred' };
    }
  });
};

export default fetchers;
