import { Repository, DataSource } from 'typeorm';
import { Coin } from './entities/coin';
import { CoinPrice } from './entities/coinPrice';
import { dataSource } from '../dataSource';

export class DBActions {
  private static instance: DBActions;
  dataSource!: DataSource;
  coinRepository!: Repository<Coin>;
  coinPriceRepository!: Repository<CoinPrice>;

  constructor (dataSource: DataSource) {
    this.dataSource = dataSource;
    this.coinRepository = dataSource.getRepository(Coin);
    this.coinPriceRepository = dataSource.getRepository(CoinPrice);
  };

  public static getInstance(): DBActions {
    if (!DBActions.instance) {
      DBActions.instance = new DBActions(dataSource);
    }
    return DBActions.instance;
  }
  
  async insertCoin(symbol: string, name: string, totalSupply: number) {
    try {
      const existingCoin = await this.coinRepository.findOne({ 
        where: [{ name }, { symbol }]
      });
  
      if (existingCoin) {
        existingCoin.total_supply = totalSupply;
        await this.coinRepository.save(existingCoin);
        console.log(`Coin '${name}' (${symbol}) total_supply updated.`);
  
      } else {
        const coin = new Coin();
        coin.name = name;
        coin.symbol = symbol;
        coin.total_supply = totalSupply;
        await this.coinRepository.save(coin);  
        console.log(`Coin '${name}' (${symbol}) inserted.`);  
      }
    } catch (error) {
      console.error('Error inserting/updating coin:', error);
      throw error;
    }
  }

  async insertCoinPrice(coinId: number, price: number) {
    try {
      const existingCoin = await this.coinPriceRepository.findOne({ 
        where: [{ coin_id: coinId }]
      });
      if (existingCoin) {
        existingCoin.price = price;
        await this.coinPriceRepository.save(existingCoin);
        console.log(`Coin '${coinId}' price updated.`);
  
      } else {
        const coinPrice = new CoinPrice();
        coinPrice.coin_id = coinId;
        coinPrice.price = price;
        this.coinPriceRepository.save(coinPrice);
        console.log(`Coin '${coinId}' price:(${price}) inserted.`);
      }
    } catch (error) {
      console.error('Error inserting/updating coin\'s price:', error);
      throw error;
    }
  }

  async findCoinId(coinName: string): Promise<number> {
    const existingCoin = await this.coinRepository.findOne({ 
      where: [{ name: coinName }]
    });
    if (existingCoin) {
      return existingCoin.id;
    }
    throw new Error('Coin not found');
  }

  async getAllCoins(): Promise<Coin[]> {
    return await this.coinRepository.find();
  }

  async getAllCoinPrices(): Promise<CoinPrice[]> {
    return await this.coinPriceRepository.find();
  }
}
