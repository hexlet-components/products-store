/* eslint-disable import/prefer-default-export */
import { ProductsT } from '../types/product';

export const isInCart = (id: number, products: ProductsT) => (!!products.find((p) => p.id === id));
