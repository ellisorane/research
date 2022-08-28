import { configureStore } from "@reduxjs/toolkit";

import counterReducer from '../features/counter/counterSlice';
import paymentSlice from "../features/payment/paymentSlice";
import projectsSlice from "../features/projects/projectsSlice";
import searchBarSlice from "../features/searchBar/searchBarSlice";

export default configureStore({
    reducer: {
        payment: paymentSlice,
        counter: counterReducer,
        projects: projectsSlice,
        searchBar: searchBarSlice
    }
})