import { ProductsT } from './product';

export type StoreT = {
    isLoading: boolean,
    products: ProductsT,
    limit: number,
    skip: number,
    total: number,
    currentPage: number,
};
