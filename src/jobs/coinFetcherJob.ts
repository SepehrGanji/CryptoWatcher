import { scheduleJob } from 'node-schedule';

import { datafetcher } from '../network/fetcher'; 
import { DBActions } from '../db/DBActions'; 


scheduleJob('*/2 * * * *', async () => {
  console.log("working...");
  try {
    const coin = 'btc';
    const [symbol, name, totalsup, price] = await datafetcher(coin);
    const dbfuncs = new DBActions();
    dbfuncs.insertCoin(symbol, name, totalsup);
    const coinId = await dbfuncs.findCoinId(name);
    dbfuncs.insertCoinPrice(coinId, price);

  } catch (error) {
    console.error('An error occurred:', error);
  }
});
