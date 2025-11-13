import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/slices/userSlice.js';
import invoiceReducer from '../redux/slices/invoiceSlice.js';

const store = configureStore({
    reducer: {
        userReducer,
        invoiceReducer,
    }
});

export default store;