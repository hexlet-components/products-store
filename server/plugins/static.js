// @ts-check

import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fp from 'fastify-plugin';

const __dirname = fileURLToPath(path.dirname(import.meta.url));
const distDir = path.resolve(__dirname, '..', '..', 'dist');

/**
 * In production serves the built SPA (and the bundled product images) from
 * `dist/`, with a history-API fallback to `index.html` for client-side routes.
 *
 * In development `dist/` does not exist, so the plugin is a no-op: the SPA is
 * served by Vite and only the `/api` routes run on Fastify.
 */
export default fp(async (fastify) => {
  if (!existsSync(distDir)) {
    fastify.log.info(
      'dist/ not found — skipping static SPA serving (dev mode)',
    );
    return;
  }

  fastify.register(import('@fastify/static'), {
    root: distDir,
    prefix: '/',
  });

  // SPA history fallback: unknown non-API GET routes return index.html.
  fastify.setNotFoundHandler((request, reply) => {
    if (request.method === 'GET' && !request.url.startsWith('/api')) {
      return reply.sendFile('index.html');
    }
    return reply.code(404).send({ message: 'Not found' });
  });
});
