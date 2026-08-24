import type { ProductsT } from "./product";

export enum FetchingProcess {
  initial,
  loaded,
  loading,
  failed,
}

export type StoreT = {
  isLoading: boolean;
  products: ProductsT;
  limit: number;
  skip: number;
  total: number;
};
