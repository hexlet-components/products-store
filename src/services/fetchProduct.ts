import type { ProductT } from '../types/product';
import { API_BASE } from './apiConfig';

const fetchProduct = async (id: number) => {
  try {
    const resp = await fetch(`${API_BASE}/products/${id}`);
    const data: ProductT = await resp.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchProduct;
