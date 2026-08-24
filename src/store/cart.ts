import { create } from "zustand";
import { getCartFromSessionStorage, updateCartSessionStorage } from "../services/cart";
import type { CartT } from "../types/cart";
import type { ProductT } from "../types/product";

interface CartState {
  cart: CartT;
  addToCart: (product: ProductT) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const persist = (cart: CartT) => {
  updateCartSessionStorage(cart);

  return { cart };
};

// Корзина это клиентское состояние, поэтому живёт в zustand. Данные магазина
// лежат в кеше запросов и своего стора не требуют.
const useCartStore = create<CartState>((set, get) => ({
  cart: getCartFromSessionStorage(),

  addToCart: (product) => {
    const { cart } = get();
    const item = cart[product.id];

    if (!item) {
      set(persist({ ...cart, [product.id]: { quantity: 1, product } }));
      return;
    }

    // Больше остатка не набрать: количество упирается в stock.
    if (item.quantity === product.stock) return;

    set(persist({ ...cart, [product.id]: { quantity: item.quantity + 1, product } }));
  },

  removeFromCart: (id) => {
    const { cart } = get();
    const { quantity, product } = cart[id];

    if (quantity > 1) {
      set(persist({ ...cart, [id]: { quantity: quantity - 1, product: { ...product } } }));
      return;
    }

    const next = { ...cart };
    delete next[id];

    set(persist(next));
  },

  clearCart: () => set(persist({})),
}));

export const useCart = () => useCartStore((state) => state.cart);
export const useAddToCart = () => useCartStore((state) => state.addToCart);
export const useRemoveFromCart = () => useCartStore((state) => state.removeFromCart);
export const useClearCart = () => useCartStore((state) => state.clearCart);

export default useCartStore;
