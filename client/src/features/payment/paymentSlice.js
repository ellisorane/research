import { createSlice } from '@reduxjs/toolkit';

export const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        value: false,
        notificationTimer: false
    },
    reducers: {
        openPayment: state => {
            state.value = true;
        },
        closePayment: state => {
            state.value = false;
        },
        setNotificationTimer: (state, action) => {
            state.notificationTimer = action.payload
        }
    }
})

export const { openPayment, closePayment, setNotificationTimer } = paymentSlice.actions;
export default paymentSlice.reducer;