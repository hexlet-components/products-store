// @ts-check

import products from '../../data/products.js';

const DEFAULT_LIMIT = 30;

const toInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export default async (fastify) => {
  // GET /api/products?skip=&limit= — paginated list, dummyjson-compatible shape.
  fastify.get('/products', async (request) => {
    const { query } = request;
    const skip = Math.max(0, toInt(query.skip, 0));
    const limit = Math.max(0, toInt(query.limit, DEFAULT_LIMIT));

    // limit=0 means "no limit" in dummyjson; otherwise slice a page.
    const page =
      limit === 0 ? products.slice(skip) : products.slice(skip, skip + limit);

    return {
      products: page,
      total: products.length,
      skip,
      limit: limit === 0 ? products.length : limit,
    };
  });

  // GET /api/products/:id — single product, 404 if not found.
  fastify.get('/products/:id', async (request, reply) => {
    const id = Number.parseInt(request.params.id, 10);
    const product = products.find((p) => p.id === id);

    if (!product) {
      return reply
        .code(404)
        .send({ message: `Product with id '${request.params.id}' not found` });
    }

    return product;
  });
};
