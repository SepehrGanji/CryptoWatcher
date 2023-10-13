import { test } from 'tap';
import { datafetcher } from '../../src/network/fetcher';

test('coindata fetcher test', async (t) => {
  const coin = 'bitcoin';
  const result = await datafetcher(coin);

  const expectedresponse = [
    String,
    String,
    Number,
    Number
  ];
  t.match(result, expectedresponse);
});
