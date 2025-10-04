import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../types';

interface CartState {
  items: CartItem[];
}

const loadCartFromStorage = (): CartItem[] => {
  const cart = localStorage.getItem('n2h_cart');
  return cart ? JSON.parse(cart) : [];
};

const saveCartToStorage = (items: CartItem[]) => {
  localStorage.setItem('n2h_cart', JSON.stringify(items));
};

const initialState: CartState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveCartToStorage(state.items);
    },
    updateCartItem: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const index = state.items.findIndex((item) => item.productId === action.payload.productId);
      if (index >= 0) {
        if (action.payload.quantity <= 0) {
          state.items.splice(index, 1);
        } else {
          state.items[index].quantity = action.payload.quantity;
        }
        saveCartToStorage(state.items);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload);
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('n2h_cart');
    },
  },
});

export const { addToCart, updateCartItem, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
