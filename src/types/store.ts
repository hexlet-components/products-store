/* eslint-disable no-shadow */

import { ProductsT } from './product';

export enum FetchingProcess {
  initial,
  loaded,
  loading,
  failed,
}

export type StoreT = {
    loadingProcess: FetchingProcess,
    products: ProductsT,
    limit: number,
    skip: number,
    total: number,
    currentPage: number,
    error: unknown,
};
