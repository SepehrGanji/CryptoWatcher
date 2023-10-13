import fetch from 'node-fetch';

export async function datafetcher(coin: string){
    const coinId = coin;
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    const response = await fetch(url);
    const info = await response.json();
    const coinSymbol = info.symbol;
    const coinName = info.name;
    const coinTotalSupply = info.market_data.total_supply;
    const coinPrice = info.market_data.current_price.usd;
    return [coinSymbol, coinName, coinTotalSupply, coinPrice];
}
