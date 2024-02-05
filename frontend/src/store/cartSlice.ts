// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Product } from '../components/types';

interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image:string
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const { _id, name, price,image } = action.payload;
      const existingItem = state.items.find(item => item.productId === _id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ productId: _id, name, quantity: 1, price,image });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
    incrementQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(item => item.productId === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(item => item.productId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectTotalPrice = (state: RootState) => {
  return state.cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
};

export default cartSlice.reducer;
