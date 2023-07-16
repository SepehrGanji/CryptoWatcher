const fetch = require('node-fetch');
import { FastifyPluginAsync } from 'fastify';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return { root: true };
  });

  ///we can use one of the fetchers
  //number1
  fastify.get('/fetcher1', async function (request, reply) {
    try {
      const coin = 'bitcoin';
      const vsCurrencies: string[] = ['usd', 'eur', 'gbp'];

      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${vsCurrencies.join(',')}`;
      const response = await fetch(url);
      const data = await response.json();

      return { data }; // Return the fetched data as the response
    } catch (error) {
      console.log('An error occurred:', error);
      return { error: 'An error occurred' }; // Return an error response if an error occurs
    }
  });

  //number2
  fastify.get('/fetcher2', async function (request, reply) {
    try {
      const coinId = 'bitcoin'; // Specify the coin ID or symbol we want to fetch
      const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
  
      const response = await fetch(url);
      const data = await response.json();
      
      // Extract the desired data, such as price, from the response
      const price = data.market_data.current_price.usd;
  
      return { price }; // Return the fetched data as the response
    } catch (error) {
      console.log('An error occurred:', error);
      return { error: 'An error occurred' }; // Return an error response if an error occurs
    }
  });
};

export default root;