import { useQuery } from "@tanstack/react-query";
import fetchProduct from "./fetchProduct";
import fetchStore from "./fetchStore";

export const productsKey = (skip: number) => ["products", skip];
export const productKey = (id: string | undefined) => ["product", id];

export const useProducts = (skip: number) =>
  useQuery({
    queryKey: productsKey(skip),
    queryFn: () => fetchStore(skip),
  });

export const useProduct = (id: string | undefined) =>
  useQuery({
    queryKey: productKey(id),
    queryFn: () => fetchProduct(Number(id)),
    enabled: id !== undefined,
  });
