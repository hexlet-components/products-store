/* eslint-disable import/prefer-default-export */
import { ProductT } from '../types/product';

export const isInCart = (id: number, products: ProductT[]) => (!!products.find((p) => p.id === id));
