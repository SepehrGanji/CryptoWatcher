import { getRepository, FindOneOptions } from 'typeorm';
import { Coin } from './entities/coin';
import { CoinPrice } from './entities/coinPrice';

export class DBActions {
  private coinRepository = getRepository(Coin);
  private coinPriceRepository = getRepository(CoinPrice);

  async createCoin(name: string): Promise<Coin> {
    const coin = new Coin();
    coin.name = name;
    return this.coinRepository.save(coin);
  }

  async createCoinPrice(coinId: number, price: number): Promise<CoinPrice> {
    const coinOptions: FindOneOptions<Coin> = { where: { id: coinId } };
    const coin = await this.coinRepository.findOne(coinOptions);

    if (!coin) {
      throw new Error('Coin not found');
    }

    const coinPrice = new CoinPrice();
    coinPrice.coin = coin;
    coinPrice.price = price;
    return this.coinPriceRepository.save(coinPrice);
  }

  // Add more methods as needed
}
