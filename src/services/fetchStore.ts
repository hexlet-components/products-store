import { DummyStoreResponseT } from '../types/dummyStoreResponse';

const fetchStore = async () => {
  try {
    const resp = await fetch('https://dummyjson.com/products');
    const data: DummyStoreResponseT = await resp.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchStore;
