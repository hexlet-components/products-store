// @vitest-environment node

import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { build } from './helper.js';

describe('POST /api/orders', () => {
  let app;

  beforeAll(async () => {
    app = await build();
  });

  afterAll(async () => {
    await app.close();
  });

  // The deliberate QA bug: placing an order always fails with HTTP 500.
  test('always responds with 500', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/orders',
      payload: { products: [{ id: 1, quantity: 2 }], total: 19.98 },
    });

    expect(res.statusCode).toBe(500);
  });
});
