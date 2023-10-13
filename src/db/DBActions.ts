import { Repository, DataSource } from 'typeorm';
import { Coin } from './entities/coin';
import { CoinPrice } from './entities/coinPrice';

export class DBActions {
  private static instance: DBActions;
  dataSource!: DataSource;
  coinRepository!: Repository<Coin>;
  coinPriceRepository!: Repository<CoinPrice>;

  init = (dataSource: DataSource) => {
    this.dataSource = dataSource;
    this.coinRepository = dataSource.getRepository(Coin);
    this.coinPriceRepository = dataSource.getRepository(CoinPrice);
  };

  public static getInstance(
    coinRepository: Repository<Coin>,
    coinPriceRepository: Repository<CoinPrice>,
  ): DBActions {
    if (!DBActions.instance) {
      DBActions.instance = new DBActions();
    }
    return DBActions.instance;
  }
  
  async insertCoin(name: string, symbol: string, totalSupply: number): Promise<Coin> {
    const coin = new Coin();
    coin.name = name;
    coin.symbol = symbol;
    coin.total_supply = totalSupply;
    return this.coinRepository.save(coin);
  }

  async insertCoinPrice(coinId: number, price: number): Promise<CoinPrice> {
    const coinPrice = new CoinPrice();
    coinPrice.coinId = coinId;
    coinPrice.price = price;

    return this.coinPriceRepository.save(coinPrice);
  }

  async findCoinId(coinName: string): Promise<number> {
    const coin = await this.coinRepository.findOne({ where: { name: coinName } });
    if (coin) {
      return coin.id;
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
