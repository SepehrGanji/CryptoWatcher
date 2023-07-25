import { test } from 'tap';
import { build } from '../helper';

test('default root route', async (t) => {
  const app = await build(t);
  const res = await app.inject({
    url: '/',
  });
  t.same(JSON.parse(res.payload), { root: true });

  //fetcher1
  const res1 = await app.inject({
    url: '/fetcher1',
  });
  const expectedDataStructure1 = {
    data: {
      bitcoin: {
        usd: Number,
        eur: Number,
        gbp: Number
      }
    }
  };

  const responseData1 = JSON.parse(res1.payload);
  t.match(responseData1, expectedDataStructure1);

  //fetcher2
  const res2 = await app.inject({
    url: '/fetcher2',
  });
  t.match(JSON.parse(res2.payload), { price: Number });
});
