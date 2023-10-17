import { scheduleJob } from 'node-schedule';
import { datafetcher } from '../network/fetcher'; 
import { dbinstance } from '../app'; 


scheduleJob('*/2 * * * *', async () => {
  console.log("working...");
  try {
    const coin = 'btc';
    const [symbol, name, totalsup, price] = await datafetcher(coin);
    dbinstance.insertCoin(symbol, name, totalsup);
    const coinId = await dbinstance.findCoinId(name);
    dbinstance.insertCoinPrice(coinId, price);

  } catch (error) {
    console.error('An error occurred:', error);
  }
});
