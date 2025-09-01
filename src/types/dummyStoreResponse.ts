import { ProductT } from './product'

export type DummyStoreResponseT = {
  products: ProductT
  limit: number
  skip: number
  total: number
}
