import { DummyStoreResponseT } from '../types/dummyStoreResponse';

const fetchStore = async (skip: number) => {
  try {
    const resp = await fetch(`https://dummyjson.com/products?skip=${skip}`);
    const data: DummyStoreResponseT = await resp.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchStore;
