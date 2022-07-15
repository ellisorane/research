import { configureStore } from "@reduxjs/toolkit";

import counterReducer from '../features/counter/counterSlice';
import paymentSlice from "../features/payment/paymentSlice";

export default configureStore({
    reducer: {
        payment: paymentSlice,
        counter: counterReducer
    }
})