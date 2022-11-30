import { ProductT } from './product';

export type CartT = {
    [id: number]: {quantity: number, product: ProductT},
};
