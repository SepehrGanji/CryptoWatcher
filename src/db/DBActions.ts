import { Repository } from 'typeorm';
import { Coin } from './entities/coin';
import { CoinPrice } from './entities/coinPrice';

export class DBActions {
  constructor(
    private readonly coinRepository: Repository<Coin>,
    private readonly coinPriceRepository: Repository<CoinPrice>
  ) {}

  async createCoin(name: string): Promise<Coin> {
    const coin = new Coin();
    coin.name = name;
    return await this.coinRepository.save(coin);
  }

  async createCoinPrice(coin: Coin, price: number): Promise<CoinPrice> {
    const coinPrice = new CoinPrice();
    coinPrice.coin = coin;
    coinPrice.price = price;
    return await this.coinPriceRepository.save(coinPrice);
  }

  async getAllCoins(): Promise<Coin[]> {
    return await this.coinRepository.find();
  }

  async getAllCoinPrices(): Promise<CoinPrice[]> {
    return await this.coinPriceRepository.find();
  }

}
