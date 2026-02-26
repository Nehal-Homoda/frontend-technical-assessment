import { configureStore } from '@reduxjs/toolkit'
import ProductCartReducer from '@/store/productCart/productCartSlice';

export const store = configureStore({
  reducer: {
    productCart: ProductCartReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch