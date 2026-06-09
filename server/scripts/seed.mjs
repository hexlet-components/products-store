// Snapshot of the DummyJSON dataset for the internal products API.
//
// Downloads the product catalogue and every product image once, rewrites the
// image URLs to local paths, and writes a self-contained seed so the app no
// longer depends on dummyjson.com at runtime.
//
// Usage: node server/scripts/seed.mjs

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SOURCE_URL =
  'https://raw.githubusercontent.com/Ovi/DummyJSON/master/database/products.json';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..');
const publicDir = path.join(repoRoot, 'public');
const dataFile = path.join(repoRoot, 'server', 'data', 'products.json');

const CONCURRENCY = 16;

// Map a remote cdn.dummyjson.com image URL to a local public path.
// The URL pathname (e.g. /product-images/beauty/.../thumbnail.webp) is reused
// verbatim, so the rewritten URL is just that pathname.
const toLocalPath = (url) => new URL(url).pathname;

const downloadImage = async (url) => {
  const localPath = toLocalPath(url);
  const dest = path.join(publicDir, localPath);

  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`Failed to download ${url}: HTTP ${resp.status}`);
  }
  const buffer = Buffer.from(await resp.arrayBuffer());

  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, buffer);

  return localPath;
};

// Run async tasks with a bounded concurrency pool.
const runPool = async (items, worker) => {
  let index = 0;
  let done = 0;
  const total = items.length;

  const next = async () => {
    while (index < total) {
      const current = index;
      index += 1;
      await worker(items[current], current);
      done += 1;
      if (done % 50 === 0 || done === total) {
        console.log(`  ${done}/${total} images`);
      }
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, total) }, () => next()),
  );
};

const main = async () => {
  console.log(`Fetching catalogue from ${SOURCE_URL}`);
  const resp = await fetch(SOURCE_URL);
  if (!resp.ok) {
    throw new Error(`Failed to fetch catalogue: HTTP ${resp.status}`);
  }
  const raw = await resp.json();
  const products = Array.isArray(raw) ? raw : raw.products;
  console.log(`Got ${products.length} products`);

  // Collect every unique image URL and rewrite the product objects in place.
  const urls = new Set();
  for (const product of products) {
    if (product.thumbnail) {
      urls.add(product.thumbnail);
      product.thumbnail = toLocalPath(product.thumbnail);
    }
    if (Array.isArray(product.images)) {
      product.images = product.images.map((url) => {
        urls.add(url);
        return toLocalPath(url);
      });
    }
  }

  const urlList = [...urls];
  console.log(`Downloading ${urlList.length} images into ${publicDir}`);
  await runPool(urlList, downloadImage);

  await mkdir(path.dirname(dataFile), { recursive: true });
  await writeFile(dataFile, `${JSON.stringify(products, null, 2)}\n`);
  console.log(`Wrote ${products.length} products to ${dataFile}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
