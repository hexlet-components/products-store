import { ProductT } from './product';

export type StoreT = {
    isLoading: boolean,
    products: ProductT[] | [],
    limit: number,
    skip: number,
    total: number,
};
