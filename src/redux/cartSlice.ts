import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
  id: bigint;
  name: string;
  price: bigint;
  quantity: number;
  image: string;
  farmer: `0x${string}`
};

type CartState = {
  items: CartItem[];
};

// Load initial cart state from localStorage
const savedCart = typeof window !== 'undefined' && localStorage.getItem('cart');
const initialState: CartState = {
  items: savedCart ? JSON.parse(savedCart) : [],
};


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const itemExists = state.items.find(item => item.id === action.payload.id);
      if (itemExists) {
        itemExists.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
