import { test } from 'tap';
import { build } from '../helper';

test('fetcher 2 test', async (t) => {
  const app2 = await build(t);
  const res2 = await app2.inject({
    url: '/fetcher2',
  });
  t.match(JSON.parse(res2.payload), { price: Number });
});
