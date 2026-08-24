import type { ProductsT } from "./product";

export type DummyStoreResponseT = {
  products: ProductsT;
  limit: number;
  skip: number;
  total: number;
};
