import { TCartItem, TProduct } from '@/components/layout/FeaturedProductsSection';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartState {
  active_cart: TCartItem[];
  add_item: (item: TProduct) => void;
  remove_item: (id: string) => void;
  update_item_quantity: (id: string, quantity: number) => void;
  delete_item: (id: string) => void;
  clear_cart: () => void;
}


export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      active_cart: [],

      add_item: (item) => {
        set((state) => {
          const existingItem = state.active_cart.find(cartItem => cartItem.id === item.id);

          if (existingItem) {
            return {
              active_cart: state.active_cart.map(cartItem =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              )
            };
          } else {
            return {
              active_cart: [...state.active_cart, { ...item, quantity: 1 }]
            };
          }
        });
      },
      remove_item: (id) => {
        set((state) => {
          const existingItem = state.active_cart.find(cartItem => cartItem.id === id);

          if (existingItem && existingItem.quantity > 1) {
            return {
              active_cart: state.active_cart.map(cartItem =>
                cartItem.id === id
                  ? { ...cartItem, quantity: cartItem.quantity - 1 }
                  : cartItem
              )
            };
          } else {
            return {
              active_cart: state.active_cart.filter(cartItem => cartItem.id !== id)
            };
          }
        });
      },

      update_item_quantity: (id, quantity) => {
        set((state) => ({
          active_cart: state.active_cart
            .map(cartItem =>
              cartItem.id === id
                ? { ...cartItem, quantity: Math.max(0, quantity) }
                : cartItem
            )
            .filter(cartItem => cartItem.quantity > 0)
        }));
      },

      delete_item: (id) => {
        set((state) => ({
          active_cart: state.active_cart.filter(cartItem => cartItem.id !== id)
        }));
      },

      clear_cart: () => {
        set({ active_cart: [] });
        // Clear persisted storage if needed
      },

    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);