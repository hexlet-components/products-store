/* eslint-disable import/prefer-default-export */
import { ProductsT } from '../types/product';

export const filterProducts = (
  filterFrom: ProductsT,
  category: string,
  search: string,
  brands: Set<string>,
  minValue: number,
  maxValue: number,
  isInStock: boolean,
) => {
  let filtered = filterFrom.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  if (category) filtered = filtered.filter((p) => p.category === category);
  if (Array.from(brands).length) filtered = filtered.filter((p) => brands.has(p.brand));
  if (isInStock) {
    filtered = filtered.filter((p) => p.stock > 0);
  } else filtered = filtered.filter((p) => p.stock === 0);
  if (minValue) filtered = filtered.filter((p) => p.price > minValue);
  if (maxValue) filtered = filtered.filter((p) => p.price < maxValue);

  return filtered;
};

export const getPriceWithDiscount = (price: number, discount: number) => (price * ((100 - discount) / 100));
