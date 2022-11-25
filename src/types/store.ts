import { ProductT } from './product';

export type StoreT = {
    isLoading: boolean,
    products: ProductT[] | [],
};
