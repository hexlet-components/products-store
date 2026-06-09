// @ts-check

import Fastify from 'fastify';
import app from '../app.js';

// Builds a ready-to-inject Fastify instance from the application plugin.
export const build = async () => {
  const fastify = Fastify();
  await fastify.register(app);
  await fastify.ready();
  return fastify;
};
