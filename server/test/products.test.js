// @vitest-environment node

import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { build } from './helper.js';

describe('GET /api/products', () => {
  let app;

  beforeAll(async () => {
    app = await build();
  });

  afterAll(async () => {
    await app.close();
  });

  test('returns the first page with dummyjson-compatible shape', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/products' });

    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.limit).toBe(30);
    expect(body.skip).toBe(0);
    expect(body.total).toBe(194);
    expect(body.products).toHaveLength(30);
  });

  test('paginates by skip', async () => {
    const first = await app.inject({ method: 'GET', url: '/api/products' });
    const second = await app.inject({
      method: 'GET',
      url: '/api/products?skip=30',
    });

    expect(second.json().skip).toBe(30);
    expect(second.json().products[0].id).not.toBe(first.json().products[0].id);
  });

  test('returns a single product with required fields and a local image path', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/products/1' });

    expect(res.statusCode).toBe(200);
    const product = res.json();
    for (const field of [
      'id',
      'title',
      'price',
      'discountPercentage',
      'rating',
      'stock',
      'brand',
      'category',
      'thumbnail',
      'images',
    ]) {
      expect(product).toHaveProperty(field);
    }
    expect(product.id).toBe(1);
    expect(product.thumbnail).toMatch(/^\/product-images\//);
    expect(product.images[0]).toMatch(/^\/product-images\//);
  });

  test('returns 404 for an unknown product', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/products/999999',
    });

    expect(res.statusCode).toBe(404);
  });
});
