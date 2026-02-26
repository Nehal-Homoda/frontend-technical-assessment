'use client'
import { Product } from '@/app/_interfaces/products.interface';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
  cartItems: Product[];
  cartItemsNum: number;
}

const initialState: InitialStateType = {
  cartItems: [],
  cartItemsNum: 0,
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    changeItemsNum: (state, action: PayloadAction<number>) => {
      state.cartItemsNum = action.payload;
      localStorage.setItem('itemNum', state.cartItemsNum.toString());
    },

    addProductItemInCart: (state, action: PayloadAction<Product>) => {
      const productItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (!productItem) {
        state.cartItems.push(action.payload);
        state.cartItemsNum = state.cartItems.length;
      }
      localStorage.setItem('productItem', JSON.stringify(state.cartItems));
      localStorage.setItem('itemNum', state.cartItemsNum.toString());
    },

    removeProductFromCart: (state, action: PayloadAction<Product>) => {
      const productItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productItemIndex !== -1) {
        state.cartItems.splice(productItemIndex, 1);
        state.cartItemsNum = state.cartItems.length;
      }

      localStorage.setItem('productItem', JSON.stringify(state.cartItems));
      localStorage.setItem('itemNum', state.cartItemsNum.toString());
    },

    dataFromLocalStorage: (state) => {
      const productNum = localStorage.getItem('itemNum');
      const productItems = localStorage.getItem('productItem');

      if (productNum) {
        state.cartItemsNum = parseInt(productNum);
      }
      if (productItems) {
        state.cartItems = JSON.parse(productItems);
      }
    },
  },
});

export const {
  changeItemsNum,
  addProductItemInCart,
  removeProductFromCart,
  dataFromLocalStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
