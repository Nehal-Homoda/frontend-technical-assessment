import { useState, useEffect } from 'react';

'use client'
import { Product } from '../../app/_interfaces/products.interface';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface InitialStateType {
    cartItems: Product[],
    cartItemsNum: number
}
const initialState: InitialStateType = {
    cartItems: [],
    cartItemsNum: 0
}

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        changeItemsNum: (state, payload) => {
            state.cartItemsNum = payload.payload
            localStorage.setItem('itemNum', state.cartItemsNum.toString())
        },
        addProductItemInCart: (state, payload: PayloadAction<Product>) => {
            const productItem = state.cartItems.find((item) => {
                item == payload.payload
            })
            if (!productItem) {
                state.cartItems.push(payload.payload)
                state.cartItemsNum = state.cartItems.length
            }
            localStorage.setItem('productItem', JSON.stringify(state.cartItems))

        },
        removeProductFromCart: (state, payload: PayloadAction<Product>) => {
            const productItemIndex = state.cartItems.findIndex((item) => {
                item == payload.payload
            })
            if (productItemIndex) {

                state.cartItems.splice(productItemIndex, 1)
            }
             localStorage.setItem('productItem', JSON.stringify(state.cartItems))
        },
        dataFromLocalStorage:(state)=>{
            const productNum= localStorage.getItem('itemNum')
            const productItems= localStorage.getItem('productItem')
            if(productNum){
             state.cartItemsNum=parseInt(productNum)
            }
            if(productItems){
             state.cartItems=JSON.parse(productItems)
            }
        }

    }
})

export const { changeItemsNum, addProductItemInCart, removeProductFromCart ,dataFromLocalStorage } = cartSlice.actions;


export default cartSlice.reducer;