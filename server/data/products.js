// @ts-check

import { createRequire } from 'node:module';

// Load the seeded catalogue (snapshot of the DummyJSON dataset). Using
// createRequire keeps the JSON import simple and works without import assertions.
const require = createRequire(import.meta.url);

/** @type {Array<Record<string, unknown>>} */
const products = require('./products.json');

export default products;
