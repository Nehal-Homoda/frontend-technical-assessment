import { Product } from "@/app/_interfaces/products.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
    cartItems: Product[];
    cartItemsQuantity: number[];
    cartItemsCount: number;
}

const initialState: InitialStateType = {
    cartItems: [],
    cartItemsQuantity: [],
    cartItemsCount: 0,
};

export const productCartSlice = createSlice({
    name: "productCart",
    initialState,
    reducers: {
        addProductItem: (state, action: PayloadAction<Product>) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (itemIndex !== -1) {
                state.cartItemsQuantity[itemIndex]++;
            } else {
                state.cartItems.push(action.payload);
                state.cartItemsQuantity.push(1);
            }

            state.cartItemsCount = state.cartItemsQuantity.reduce(
                (prev, current) => prev + current,
                0
            );

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem(
                "cartItemsQuantity",
                JSON.stringify(state.cartItemsQuantity)
            );
        },

        removeProductItem: (state, action: PayloadAction<Product>) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );
            if (itemIndex === -1) return;

            if (state.cartItemsQuantity[itemIndex] > 1) {
                state.cartItemsQuantity[itemIndex]--;
            } else {
                state.cartItems.splice(itemIndex, 1);
                state.cartItemsQuantity.splice(itemIndex, 1);
            }

            state.cartItemsCount = state.cartItemsQuantity.reduce(
                (prev, current) => prev + current,
                0
            );

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem(
                "cartItemsQuantity",
                JSON.stringify(state.cartItemsQuantity)
            );
        },

        dataFromLocalStorage: (state) => {
            const storedCartItems = localStorage.getItem("cartItems");
            const storedCartItemsQuantity = localStorage.getItem(
                "cartItemsQuantity"
            );

            if (!storedCartItems || !storedCartItemsQuantity) return;

            state.cartItems = JSON.parse(storedCartItems);
            state.cartItemsQuantity = JSON.parse(storedCartItemsQuantity);

            state.cartItemsCount = state.cartItemsQuantity.reduce(
                (prev, current) => prev + current,
                0
            );
        },
    },
});

export const { addProductItem, removeProductItem, dataFromLocalStorage } =
    productCartSlice.actions;
export default productCartSlice.reducer;
