import { configureStore } from "@reduxjs/toolkit";

import counterReducer from '../features/counter/counterSlice';
import paymentSlice from "../features/payment/paymentSlice";
import startProjectSlice from "../features/startProject/startProjectSlice";

export default configureStore({
    reducer: {
        payment: paymentSlice,
        counter: counterReducer,
        formData: startProjectSlice
    }
})