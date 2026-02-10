import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem, Product } from '@/types';

interface CartStore {
  cart: Cart;
  addItem: (product: Product, quantity: number, size?: string, color?: string) => void;
  removeItem: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: {
        items: [],
        total: 0,
        subtotal: 0,
        tax: 0,
        shipping: 0,
      },

      addItem: (product: Product, quantity: number, size?: string, color?: string) => {
        set((state) => {
          const existingItem = state.cart.items.find(
            (item) =>
              item.productId === product.id &&
              item.size === size &&
              item.color === color
          );

          let newItems: CartItem[];

          if (existingItem) {
            newItems = state.cart.items.map((item) =>
              item.productId === product.id &&
              item.size === size &&
              item.color === color
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            newItems = [
              ...state.cart.items,
              {
                productId: product.id,
                quantity,
                size,
                color,
                price: product.price,
                product,
              },
            ];
          }

          const subtotal = newItems.reduce((total, item) => total + item.price * item.quantity, 0);
          const tax = subtotal * 0.1; // 10% tax
          const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100

          return {
            cart: {
              items: newItems,
              subtotal,
              tax,
              shipping,
              total: subtotal + tax + shipping,
            },
          };
        });
      },

      removeItem: (productId: string, size?: string, color?: string) => {
        set((state) => {
          const newItems = state.cart.items.filter(
            (item) =>
              !(item.productId === productId && item.size === size && item.color === color)
          );

          const subtotal = newItems.reduce((total, item) => total + item.price * item.quantity, 0);
          const tax = subtotal * 0.1;
          const shipping = subtotal > 100 ? 0 : 10;

          return {
            cart: {
              items: newItems,
              subtotal,
              tax,
              shipping,
              total: subtotal + tax + shipping,
            },
          };
        });
      },

      updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => {
        set((state) => {
          const newItems = state.cart.items.map((item) =>
            item.productId === productId && item.size === size && item.color === color
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          );

          const subtotal = newItems.reduce((total, item) => total + item.price * item.quantity, 0);
          const tax = subtotal * 0.1;
          const shipping = subtotal > 100 ? 0 : 10;

          return {
            cart: {
              items: newItems,
              subtotal,
              tax,
              shipping,
              total: subtotal + tax + shipping,
            },
          };
        });
      },

      clearCart: () => {
        set({
          cart: {
            items: [],
            total: 0,
            subtotal: 0,
            tax: 0,
            shipping: 0,
          },
        });
      },

      getCartTotal: () => {
        return get().cart.total;
      },

      getCartCount: () => {
        return get().cart.items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-store',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
