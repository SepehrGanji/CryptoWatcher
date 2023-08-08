import { test } from 'tap';
import { build } from '../helper';

test('fetcher 1 test', async (t) => {
  const app1 = await build(t);
  const res1 = await app1.inject({
    url: '/fetcher1',
  });

  const expectedDataStructure1 = {
    data: {
      bitcoin: {
        usd: Number,
        eur: Number,
        gbp: Number,
      },
    },
  };

  const responseData1 = JSON.parse(res1.payload);
  t.match(responseData1, expectedDataStructure1);
});
