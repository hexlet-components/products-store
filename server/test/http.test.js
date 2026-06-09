// @vitest-environment node

import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { build } from './helper.js';

describe('GET /api/http/500/failed', () => {
  let app;

  beforeAll(async () => {
    app = await build();
  });

  afterAll(async () => {
    await app.close();
  });

  // The deliberate QA bug: ordering always fails with HTTP 500.
  test('always responds with 500', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/http/500/failed',
    });

    expect(res.statusCode).toBe(500);
  });
});
