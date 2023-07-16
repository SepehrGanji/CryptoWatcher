import { test } from 'tap';
import { build } from '../helper';

test('default root route', async (t) => {
  const app = await build(t);
  //root
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

  // Parse the response payload
  const responseData1 = JSON.parse(res1.payload);

  // Check if the response data has the same structure as the expected structure
  t.match(responseData1, expectedDataStructure1);

  //fetcher2
  const res2 = await app.inject({
    url: '/fetcher2',
  });
  // Parse the response payload
  t.match(JSON.parse(res2.payload), { price: Number });
});