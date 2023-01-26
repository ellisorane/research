import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/auth/authSlice";
import paymentSlice from "../features/payment/paymentSlice";
import projectsSlice from "../features/projects/projectsSlice";
import searchBarSlice from "../features/searchBar/searchBarSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        payment: paymentSlice,
        projects: projectsSlice,
        searchBar: searchBarSlice
    }
})