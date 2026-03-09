import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import category from './categorySlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productReducer,
        categories: category
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;