import { create } from 'zustand'

export interface CartItem {
  cartItemId: string; // ID unik untuk membedakan item di keranjang
  productId: string;
  name: string;
  price: number;
  image_url: string;
  customizations: Record<string, string>; // Menyimpan "Request Tulisan: Happy Grad", dll
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
}))