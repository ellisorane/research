import { createSlice } from '@reduxjs/toolkit';

export const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        value: false
    },
    reducers: {
        openPayment: state => {
            state.value = true;
        },
        closePayment: state => {
            state.value = false;
        },
    }
})

export const { openPayment, closePayment } = paymentSlice.actions;
export default paymentSlice.reducer;