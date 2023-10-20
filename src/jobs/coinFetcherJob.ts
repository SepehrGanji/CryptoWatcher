import { scheduleJob } from 'node-schedule';
import { datafetcher } from '../network/fetcher'; 
import { dbinstance } from '../app'; 

export const runScheduledJob = () => {
  scheduleJob('*/2 * * * *', async () => {
        try {
      const coin = 'bitcoin';
      const [symbol, name, totalsup, price] = await datafetcher(coin);
      await dbinstance.insertCoin(symbol, name, totalsup);
      const coinId = await dbinstance.findCoinId(name);
      await dbinstance.insertCoinPrice(coinId, price);

    } catch (error) {
      console.error('An error occurred:', error);
    }
  });
};
