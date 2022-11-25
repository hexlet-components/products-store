import { ProductT } from '../types/product';

const fetchProduct = async (id: number) => {
  try {
    const resp = await fetch(`https://dummyjson.com/products/${id}`);
    const data: ProductT = await resp.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchProduct;
