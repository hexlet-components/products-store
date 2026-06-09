import { DummyStoreResponseT } from '../types/dummyStoreResponse';
import { API_BASE } from './apiConfig';

const fetchStore = async (skip: number) => {
  const resp = await fetch(`${API_BASE}/products?skip=${skip}`);
  const data: DummyStoreResponseT = await resp.json();

  return data;
};

export default fetchStore;
