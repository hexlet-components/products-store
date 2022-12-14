import { DummyStoreResponseT } from '../types/dummyStoreResponse';

const fetchStore = async (skip: number) => {
  const resp = await fetch(`https://dummyjson.com/products?skip=${skip}`);
  const data: DummyStoreResponseT = await resp.json();

  return data;
};

export default fetchStore;
