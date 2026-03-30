import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import category from './categorySlice';
import authSlice from './authSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productReducer,
        categories: category,
        auth: authSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;